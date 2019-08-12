    // Initial array of giffs
    const giffs = ["elephant", "cat", "puppy", "bird", "skank", "hamster", "chicken", "frog", "shark", "lion"];

    // Function for dumping the JSON content for each button into the div
    function displaygiffInfo() {

        const giff = this.getAttribute("data-name");
        const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giff + "&apikey=SyFrfcdyzuaywQoMApTmo3rvUzTFQx14&limit=10";

        fetch(queryURL).then(function (response) {
            return response.json();
        }).then(function (responseJson) {
            const results = responseJson.data;
            console.log(results);

            // To empty result from previous button
            document.getElementById("giffs-view").innerHTML = "";

            // results loop
            for (let i = 0; i < results.length; i++) {
                // Url variable
                const imageUrl = responseJson.data.image_original_url;

                // Creating a div for the gif
                const gifDiv = document.createElement("div");
                gifDiv.setAttribute("class", "newDiv");

                const rating = results[i].rating;

                if (results[i].rating !== "r" || results[i].rating === "pg") {

                // p tag
                const p = document.createElement("p");
                p.innerHTML = "Rating: " + rating;

                // image
                const gifImage = document.createElement("img");
                gifImage.setAttribute("class", "img img-thumbnail");

                // source attribute of image 
                gifImage.setAttribute("src", imageUrl);

                gifImage.setAttribute("src", results[i].images.fixed_height_still.url);

                gifImage.addEventListener('click', function () {
                    const state = this.getAttribute("data-state");
                    if (state === "still") {
                        this.setAttribute('src', results[i].images.fixed_height_still.url);
                        imageUrl.state = 'animate';
                      } else {
                        this.setAttribute('src', results[i].images.fixed_height.url);
                        imageUrl.state = 'still';
                      }
                });
             

                //place image on html
                gifDiv.append(p);
                gifDiv.append(gifImage);
                document.getElementById("giffs-view").prepend(gifDiv);
                }
            }
        });
    }

    // Displaying giff data
    function showButtons() {

        // Remove previous buttons
        document.getElementById("buttons-view").innerHTML = "";

        // Loop through giffs
        for (let i = 0; i < giffs.length; i++) {
            // Then dynamically generating buttons for each giff in the array
            const a = document.createElement("button");
            // Adding a class of giff to our button
            a.classList.add("giff");
            // Adding a data-attribute
            a.setAttribute("data-name", giffs[i]);
            // Providing the initial button text
            a.innerHTML = giffs[i];
            // Adding the button to the buttons-view div
            document.getElementById("buttons-view").append(a);
            // Function for displaying the giff info
            a.addEventListener("click", displaygiffInfo);
        }
    }

    // On button click
    document.getElementById("add-giff").addEventListener("click", function (event) {
        event.preventDefault();

        // grab the input
        var giff = document.getElementById("giff-input").value.trim();

        // Adding to array
        giffs.push(giff);

        // Calling showButtons
        showButtons();
    });

    // Display initial buttons
    showButtons();
