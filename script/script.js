$(document).ready(function () {
    let calculatetotals = () => {

        let library = JSON.parse(localStorage.getItem("library")) || []

        let totalstock = 0;
        let borrowbooks = 0;

        library.map(book => {
            totalstock += book.stock;
            borrowbooks += book.borrow;
        });

        let remainstock = totalstock;

        $("#totalstock").text(totalstock);
        $("#borrowbooks").text(borrowbooks);
        $("#remainingstock").text(remainstock);
    }


    let librarytable = () => {
        debugger;

        let library = JSON.parse(localStorage.getItem("library")) || []
        let newbooks = ""

        if (library && library.length > 0) {

            $.each(library, function (index, ele) {

                newbooks += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${ele.name}</td>
                    <td>${ele.type}</td>
                    <td>${ele.stock}</td>
                    <td>${ele.borrow}</td>
                </tr>
                `;

            });

        } else {

            newbooks= `
                <tr>
                    <td colspan="5">No records found</td>
                </tr>`
        }

        $("#tableBody").html(newbooks)




    };

    calculatetotals()


    librarytable()

    $("#formsubmit").on("click", function (eve) {
        // debugger;
        //  alert("hi")
        eve.preventDefault();
        let category = $("#Category").val();
        let name = $("#name").val();
        let stock = $("#stock").val();

        if (category == "") {
            $('#ecate').text("Please Select the category").css({
                color: "red",
                fontSize: "15px"
            });

            $("#Category").css({
                borderColor: "red"
            });
        } else if (category != "") {
            $('#ecate').text("")
            $("#Category").css({
                borderColor: ""
            });
        }
        if (name == "") {

            $('#ename').text("Please Enter the name!!").css({
                color: "red",
                fontSize: "15px"
            });

            $("#name").css({
                borderColor: "red"
            });

            // return;
        } else if (name != "") {
            $('#ename').text("")
            $("#name").css({
                borderColor: ""
            });

        }

        if (stock == "") {

            $('#estock').text("Please Enter the stock!!").css({
                color: "red",
                fontSize: "15px"
            });

            $("#stock").css({
                borderColor: "red"
            });

            // return;
        } else if (stock <= 0) {

            $('#estock').text("Stock can not be negative ").css({
                color: "red",
                fontSize: "15px"
            });

            $("#stock").css({
                borderColor: "red"
            });

            // return;
        } else if (stock != "") {
            $('#estock').text("")
            $("#stock").css({
                borderColor: ""
            });
        }

        if (category != "" && name != "" && stock != "" && stock >= 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Form Submitted successfully!!",
                showConfirmButton: false,
                timer: 1500
            });

            // $("#category").text("")=category
            // // name
            // // stock
        }

        // debugger;

        let library = JSON.parse(localStorage.getItem("library")) || [] //gets the saved book list from Local Storage and it sets library as an empty array.

        let book = library.find(b => b.name === name) //searches for a book with the same name inside the library

        if (category == "AddBook") {

            if (book) {
                book.stock += parseInt(stock)
            } else {

                library.push({
                    type: category,
                    name: name,
                    stock: category === "AddBook" ? parseInt(stock) : 0,
                    borrow: category === "Borrow" ? parseInt(stock) : 0
                });

            }
        }

        if (category == "Borrow") {

            if (!book) {
                Swal.fire({
                    icon: "error",
                    title: "Sorry,The Book is not found in this library!!"

                });
                return
            }

            if (parseInt(stock) > book.stock) {
                Swal.fire({
                    icon: "error",
                    title: "Sorry,Not Enough Stock is found!!"
                });
                return
            }
            let finalstock = book.stock - parseInt(stock)
            let finalborrow = book.borrow + parseInt(stock)

            book.stock = category === "Borrow" ? finalstock : book.stock
            book.borrow = category === "Borrow" ? finalborrow : book.borrow

        }

        if (category != "" && name != "" && stock != "" && stock >= 0) {
            localStorage.setItem("library", JSON.stringify(library))
            librarytable()
            calculatetotals()
            $("#Category").val("")
            $("#name").val("")
            $("#stock").val("")
        }





    });



    $("#printme").on("click", () => {
        window.print()
    })




})