var dealOrNoDeal = (function () {
    function dealOrNoDeal() {
    }
    dealOrNoDeal.main = function () {
        var boardsContainer = document.getElementById("boardsContainer");
        document.getElementById("newGame").addEventListener("click", function () {
            var name = document.getElementById("gameName").value.trim();
            var b = new board(name);
            b.populateValues(boardsContainer);
        });
    };
    return dealOrNoDeal;
}());
var briefcase = (function () {
    function briefcase(amount) {
        this.value = amount;
        this.button = document.createElement("a");
        this.button.innerText = formatStrings.currency(amount);
        this.button.className = "btn btn-primary";
        this.button.style.width = "102px";
        this.button.style.color = "white";
        this.button.style.borderRadius = "0px";
        this.status = true;
    }
    return briefcase;
}());
var board = (function () {
    function board(name) {
        this.name = name;
        this.boardContainer = document.createElement("div");
        this.boardContainer.className = "col-xs-12 col-md-6";
        this.dollarAmounts = [10, 20, 30, 40, 50, 60, 75, 80, 90, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 900, 1000];
        this.cases = [];
        this.currentOffer = document.createElement("p");
        this.currentOffer.className = "text-xs-center text-success font-weight-bold";
        this.currentOffer.innerText = "$0";
    }
    board.prototype.populateValues = function (displayDiv) {
        var _this = this;
        this.boardContainer.insertAdjacentHTML("AfterBegin", "<h4 class=\"text-xs-center\">" + this.name + "</h4>");
        var _loop_1 = function (c) {
            var Briefcase = new briefcase(c);
            Briefcase.button.addEventListener("click", function () {
                if (Briefcase.status === true) {
                    Briefcase.status = false;
                    Briefcase.button.className = "btn btn-danger";
                }
                else {
                    Briefcase.status = true;
                    Briefcase.button.className = "btn btn-primary";
                }
                _this.currentOffer.innerText = formatStrings.currency(_this.calculateOffer());
            });
            this_1.cases.push(Briefcase);
            this_1.boardContainer.appendChild(Briefcase.button);
            this_1.boardContainer.appendChild(this_1.currentOffer);
        };
        var this_1 = this;
        for (var _i = 0, _a = this.dollarAmounts; _i < _a.length; _i++) {
            var c = _a[_i];
            _loop_1(c);
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
var formatStrings;
(function (formatStrings) {
    // currency formatter: $140.23
    function currency(currencyString) {
        return currencyString.toLocaleString("en-US", { style: "currency", currency: "USD" });
    }
    formatStrings.currency = currency;
})(formatStrings || (formatStrings = {}));
;
//# sourceMappingURL=main.js.map
