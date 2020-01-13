# fuzzy-memory
First school assignment in JavaScript. A memory game built in HTML, CSS and Javascript.

## Assignment instructions

### Create a memory game using HTML, CSS and JavaScript.

-   The pairs should be randomly positioned before a new game starts.

-   The project should implement nice graphical user interface.

-   There should be a replay button to restart the game when finished.

    > **Note:** This should be done with JavaScript and **not** with a page reload.
-   The project should look, feel and work similarly in Google Chrome and Firefox.

-   The project can't contain any errors, warning or notices in the developer console.
-   The project can't use any third-party frameworks such as jQuery.


## How to play
1. Clone this in GitHub Desktop, in your terminal or got to: http://animal-memory.netlify.com
2. Turn over the cards and match them!

## Preview
<img src="https://i.imgur.com/dlWX8ca.png" width="49%" /> <img src="https://i.imgur.com/rCupKxS.png" width="49%" /> 

<img src="https://i.imgur.com/7maKFU0.png" width="100%">

## Testers
* [Thomas Sönnerstam](https://github.com/ThomasSonnerstam)
* [Betsy Alva Soplin](https://github.com/milliebase)
* [Henric Björk](https://github.com/henricbjork)

## Code Review

* functions.js:5/18 Instead of using overlayEl.style.display = 'none'; and overlayEl.style.display = 'flex'; you could toggle between an display overlay class

* style.css Don’t forget to register fonts that the user doesn’t have by default with @font-face

* style.css:130-145 declares transition transform 6 times, should just need to declare it 2 times?

* style.css:157-165 declares transition transform 6 times? 

* Overall: Very good and consistent syntax

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
