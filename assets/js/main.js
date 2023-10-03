var courseName = document.querySelector("#courseName");
var courseCategory = document.querySelector("#courseCategory");
var coursePrice = document.querySelector("#coursePrice");
var courseDescription = document.querySelector("#courseDescription");
var courseCapacity = document.querySelector("#courseCapacity");
var addBtn = document.querySelector("#click");
var updateBtn = document.querySelector("#update");
var deleteAllBtn = document.querySelector("#deleteBtn");
var clearBtn = document.querySelector("#resetbtn");
var courses = [];
var inputs = document.querySelectorAll(".inputs");
var search = document.querySelector("#search");
var nameErrorMsg = document.querySelector(".name-error");
var categoryErrorMsg = document.querySelector(".category-error");
var priceErrorMsg = document.querySelector(".price-error");
var descriptionErrorMsg = document.querySelector(".description-error");
var capacityErrorMsg = document.querySelector(".capacity-error");
var isNameTrue = false;
var isCategoryTrue = false;
var isPriceTrue = false;
var isDescriptionTrue = false;
var isCapacityTrue = false;

if(localStorage.getItem("courses") == null){
    courses = [];
}else{
    courses = JSON.parse(localStorage.getItem("courses"));
}
displayData();

addBtn.addEventListener("click", function(e){
    e.preventDefault();
    addCourse();
    clearInputs();
    displayData();

    const Toast = Swal.mixin({
        toast: true,
        position: 'center-center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Course added successfully'
      })

    courseName.classList.remove("is-valid");
    courseCategory.classList.remove("is-valid");
    coursePrice.classList.remove("is-valid");
    courseDescription.classList.remove("is-valid");
    courseCapacity.classList.remove("is-valid");
})

deleteAllBtn.addEventListener("click", function(){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your Courses has been deleted.',
            'success'
          )
          courses = [];
          displayData();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
});

clearBtn.addEventListener("click", function(){
    clearInputs();
});

function addCourse(){
    var course = {
        name:courseName.value,
        category:courseCategory.value,
        price:coursePrice.value,
        desc:courseDescription.value,
        capacity:courseCapacity.value,
    }
    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));
}

function clearInputs() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function displayData(){
    var res = "";
    for(var i = 0; i < courses.length; i++){
        res +=`
        <tr>
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].category}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].desc}</td>
            <td>${courses[i].capacity}</td>
            <td><button class = "btn btn-outline-info" onclick = "updateCourse(${i})">update</button></td>
            <td><button class = "btn btn-outline-danger" onclick = "deleteCourse(${i})">delete</button></td>
        </tr>
        `;
    }
    document.getElementById('data').innerHTML = res;
}

function deleteCourse(id){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(id, 1);
            localStorage.setItem('courses', JSON.stringify(courses));
            displayData();
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your Course has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    
}

function updateCourse(id){
    courseName.value = courses[id].name;
    courseCategory.value = courses[id].category;
    coursePrice.value = courses[id].price;
    courseDescription.value = courses[id].desc;
    courseCapacity.value = courses[id].capacity;
    addBtn.style.cssText = "display: none;";
    updateBtn.style.cssText = "display:inline;";

    updateBtn.addEventListener("click",function(e) {
        e.preventDefault();
        courses[id].name = courseName.value;
        courses[id].category = courseCategory.value;
        courses[id].price = coursePrice.value;
        courses[id].desc = courseDescription.value;
        courses[id].capacity = courseCapacity.value;
        localStorage.setItem('courses', JSON.stringify(courses));
        addBtn.style.cssText = "display: inline;";
        updateBtn.style.cssText = "display:none;";
        clearInputs();
        displayData();
        const Toast = Swal.mixin({
            toast: true,
            position: 'center-center',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Updated successfully'
          });
        courseName.classList.remove("is-valid");
        courseCategory.classList.remove("is-valid");
        coursePrice.classList.remove("is-valid");
        courseDescription.classList.remove("is-valid");
        courseCapacity.classList.remove("is-valid");
    });
}

search.addEventListener('keyup', function(){
    var res = "";
    for(var i = 0; i < courses.length; i++){
        if(courses[i].name.toLowerCase().includes(search.value.toLowerCase())){
            res +=`
                <tr>
                    <td>${i}</td>
                    <td>${courses[i].name}</td>
                    <td>${courses[i].category}</td>
                    <td>${courses[i].price}</td>
                    <td>${courses[i].desc}</td>
                    <td>${courses[i].capacity}</td>
                    <td><button class = "btn btn-outline-info">update</button></td>
                    <td><button class = "btn btn-outline-danger" onclick = "deleteCourse(${i})">delete</button></td>
                </tr>
            `;
        }
    }
    document.getElementById('data').innerHTML = res;
})

courseName.addEventListener('keyup', function(){
    var pattern = /^[A-Z][a-z]{2,10}$/;
    if (pattern.test(courseName.value)){
        if (courseName.classList.contains("is-invalid")){
            courseName.classList.remove("is-invalid");
        }
        isNameTrue = true;
        courseName.classList.add("is-valid");
        nameErrorMsg.style.cssText = "display:none;";
    }else{
        if (courseName.classList.contains("is-valid")){
            courseName.classList.remove("is-valid");
        }
        isNameTrue = false;
        courseName.classList.add("is-invalid");
        nameErrorMsg.style.cssText = "display:block;";
    }

    if(isNameTrue && isCapacityTrue && isCategoryTrue && isDescriptionTrue && isPriceTrue){
        addBtn.removeAttribute("disabled");
    }else{
        addBtn.setAttribute("disabled", "disabled");
    }
});

courseCategory.addEventListener('keyup', function(){
    var pattern = /^[A-Z][a-z]{2,15}$/;
    if (pattern.test(courseCategory.value)){
        if (courseCategory.classList.contains("is-invalid")){
            courseCategory.classList.remove("is-invalid");
        }
        isCategoryTrue = true;
        courseCategory.classList.add("is-valid");
        categoryErrorMsg.style.cssText = "display:none;";
    }else{
        if (courseCategory.classList.contains("is-valid")){
            courseCategory.classList.remove("is-valid");
        }
        isCategoryTrue = false;
        courseCategory.classList.add("is-invalid");
        categoryErrorMsg.style.cssText = "display:block;";
    }

    if(isNameTrue && isCapacityTrue && isCategoryTrue && isDescriptionTrue && isPriceTrue){
        addBtn.removeAttribute("disabled");
    }else{
        addBtn.setAttribute("disabled", "disabled");
    }
});

coursePrice.addEventListener('keyup', function(){
    var pattern =/^([1-4][0-9][0-9]|500)$/;
    if (pattern.test(coursePrice.value)){
        if (coursePrice.classList.contains("is-invalid")){
            coursePrice.classList.remove("is-invalid");
        }
        isPriceTrue = true;
        coursePrice.classList.add("is-valid");
        priceErrorMsg.style.cssText = "display:none;";
    }else{
        if (coursePrice.classList.contains("is-valid")){
            coursePrice.classList.remove("is-valid");
        }
        isPriceTrue = false;
        coursePrice.classList.add("is-invalid");
        priceErrorMsg.style.cssText = "display:block;";
    }

    if(isNameTrue && isCapacityTrue && isCategoryTrue && isDescriptionTrue && isPriceTrue){
        addBtn.removeAttribute("disabled");
    }else{
        addBtn.setAttribute("disabled", "disabled");
    }
});

courseDescription.addEventListener('keyup', function(){
    var pattern =/^.{9,50}$/;
    if (pattern.test(courseDescription.value)){
        if (courseDescription.classList.contains("is-invalid")){
            courseDescription.classList.remove("is-invalid");
        }
        isDescriptionTrue = true;
        courseDescription.classList.add("is-valid");
        descriptionErrorMsg.style.cssText = "display:none;";
    }else{
        if (courseDescription.classList.contains("is-valid")){
            courseDescription.classList.remove("is-valid");
        }
        isDescriptionTrue = false;
        courseDescription.classList.add("is-invalid");
        descriptionErrorMsg.style.cssText = "display:block;";
    }
    if(isNameTrue && isCapacityTrue && isCategoryTrue && isDescriptionTrue && isPriceTrue){
        addBtn.removeAttribute("disabled");
    }else{
        addBtn.setAttribute("disabled", "disabled");
    }
});

courseCapacity.addEventListener('keyup', function(){
    var pattern =/^([2-9][0-9]|[0-1][0-4][0-9]|150)$/;
    if (pattern.test(courseCapacity.value)){
        if (courseCapacity.classList.contains("is-invalid")){
            courseCapacity.classList.remove("is-invalid");
        }
        isCapacityTrue = true;
        courseCapacity.classList.add("is-valid");
        capacityErrorMsg.style.cssText = "display:none;";
    }else{
        if (courseCapacity.classList.contains("is-valid")){
            courseCapacity.classList.remove("is-valid");
        }
        isCapacityTrue = false;
        courseCapacity.classList.add("is-invalid");
        capacityErrorMsg.style.cssText = "display:block;";
    }
    if(isNameTrue && isCapacityTrue && isCategoryTrue && isDescriptionTrue && isPriceTrue){
        addBtn.removeAttribute("disabled");
    }else{
        addBtn.setAttribute("disabled", "disabled");
    }
});