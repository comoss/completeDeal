var dealOrNoDeal = (function () {
    function dealOrNoDeal() {
    }
    dealOrNoDeal.main = function () {
        var boardsContainer = document.getElementById("boardsContainer");
        document.getElementById("newGame").addEventListener("click", function () {
            var name = document.getElementById("gameName").value.trim();
            var playerSelectedNumber = document.getElementById("playerSelectedNumber").value;
            var b = new board(name, Number(playerSelectedNumber));
            b.populateValues(boardsContainer);
        });
    };
    return dealOrNoDeal;
}());
var briefcase = (function () {
    function briefcase(amount, caseNumber) {
        this.value = amount;
        this.caseNumber = caseNumber;
        this.status = true;
        this.button = document.createElement("a");
        this.button.innerText = formatter.currency(amount);
        this.button.className = "btn btn-primary";
        this.button.style.width = "102px";
        this.button.style.color = "white";
        this.button.style.borderRadius = "0px";
        this.caseElement = document.createElement("div");
        this.caseElement.className = "btn btn-success";
        this.caseElement.style.width = "102px";
        this.caseElement.style.color = "white";
        this.caseElement.style.borderRadius = "0px";
        this.caseElement.innerText = String(caseNumber);
    }
    return briefcase;
}());
var board = (function () {
    function board(name, playerSelectedNumber) {
        this.name = name;
        this.playerSelectedCase = playerSelectedNumber;
        this.caseContainer = document.createElement("div");
        this.caseContainer.className = "col-xs-12";
        this.offerContainer = document.createElement("div");
        this.offerContainer.className = "col-xs-12";
        this.boardContainer = document.createElement("div");
        this.boardContainer.className = "col-xs-12 col-md-6 text-xs-center";
        this.boardContainer.appendChild(this.caseContainer);
        this.boardContainer.appendChild(this.offerContainer);
        this.caseNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
        this.dollarAmounts = [10, 20, 30, 40, 50, 60, 75, 80, 90, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 900, 1000];
        this.cases = [];
        this.currentOffer = document.createElement("p");
        this.currentOffer.className = "text-success font-weight-bold";
        this.currentOffer.innerText = "$0";
    }
    board.prototype.populateValues = function (displayDiv) {
        var _this = this;
        this.boardContainer.insertAdjacentHTML("AfterBegin", "<h4 class=\"text-xs-center\">" + this.name + "</h4>");
        var shuffledArr = formatter.shuffleArray(this.caseNumbers);
        console.log("shuffledArr: ", shuffledArr);
        var _loop_1 = function (i) {
            var Briefcase = new briefcase(this_1.dollarAmounts[i], shuffledArr[i]);
            this_1.cases.push(Briefcase);
            this_1.offerContainer.appendChild(Briefcase.button);
            this_1.offerContainer.appendChild(this_1.currentOffer);
            //this.caseContainer.appendChild(Briefcase.caseElement); 
            if (shuffledArr[i] != this_1.playerSelectedCase) {
                Briefcase.caseElement.addEventListener("click", function () {
                    if (Briefcase.status === true) {
                        Briefcase.status = false;
                        Briefcase.button.className = "btn btn-danger";
                        Briefcase.caseElement.className = "btn btn-danger";
                    }
                    _this.currentOffer.innerText = formatter.currency(_this.calculateOffer());
                });
            }
            else {
                Briefcase.caseElement.className = "btn btn-secondary disabled text-primary";
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.dollarAmounts.length; i++) {
            _loop_1(i);
        }
        var orderedArray = this.cases.sort(function (a, b) { return a.caseNumber - b.caseNumber; });
        console.log(orderedArray);
        for (var _i = 0, orderedArray_1 = orderedArray; _i < orderedArray_1.length; _i++) {
            var caseElement = orderedArray_1[_i];
            this.caseContainer.appendChild(caseElement.caseElement);
        }
        displayDiv.appendChild(this.boardContainer);
    };
    board.prototype.calculateOffer = function () {
        var AmountActive = 0;
        var median = 0;
        for (var _i = 0, _a = this.cases; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.status === true) {
                AmountActive++;
                if (AmountActive === 26) {
                    median = 0;
                }
                else {
                    median = median + c.value;
                }
            }
        }
        return median / AmountActive;
    };
    return board;
}());
dealOrNoDeal.main();
var formatter;
(function (formatter) {
    // currency formatter: $140.23
    function currency(currencyString) {
        return currencyString.toLocaleString("en-US", { style: "currency", currency: "USD" });
    }
    formatter.currency = currency;
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    formatter.shuffleArray = shuffleArray;
})(formatter || (formatter = {}));
;
//# sourceMappingURL=main.js.map
