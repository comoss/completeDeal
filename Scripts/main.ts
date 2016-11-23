class dealOrNoDeal {
    public static main() {

        const boardsContainer = document.getElementById("boardsContainer");

        document.getElementById("newGame").addEventListener("click", () => {
            const name = (<HTMLInputElement>document.getElementById("gameName")).value.trim();
            const playerSelectedNumber = <HTMLSelectElement>document.getElementById("playerSelectedNumber").value; 
            const b = new board(name, Number(playerSelectedNumber));
            b.populateValues(boardsContainer);
        });
    }
}

class briefcase {
    button: HTMLAnchorElement;
    caseElement: HTMLDivElement;
    value: number; 
    status: boolean;
    caseNumber: number;

    constructor(amount: number, caseNumber: number) {
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
}

class board {
    name: string;
    dollarAmounts: number[];
    caseNumbers: number[];
    cases: briefcase[];
    boardContainer: HTMLDivElement;
    caseContainer: HTMLDivElement;
    offerContainer: HTMLDivElement; 
    currentOffer: HTMLParagraphElement; 
    playerSelectedCase: number; 

    constructor(name: string, playerSelectedNumber: number) {
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

    populateValues(displayDiv) {
        this.boardContainer.insertAdjacentHTML("AfterBegin", `<h4 class="text-xs-center">${this.name}</h4>`); 

        let shuffledArr = formatter.shuffleArray(this.caseNumbers);
        console.log("shuffledArr: ", shuffledArr)
        for (let i = 0; i < this.dollarAmounts.length; i++) {
            const Briefcase = new briefcase(this.dollarAmounts[i], shuffledArr[i]);

            this.cases.push(Briefcase);

            this.offerContainer.appendChild(Briefcase.button);
            this.offerContainer.appendChild(this.currentOffer);

            //this.caseContainer.appendChild(Briefcase.caseElement); 
            if (shuffledArr[i] != this.playerSelectedCase) {
                Briefcase.caseElement.addEventListener("click", () => {
                    if (Briefcase.status === true) {
                        Briefcase.status = false;
                        Briefcase.button.className = "btn btn-danger"
                        Briefcase.caseElement.className = "btn btn-danger"
                    }

                    this.currentOffer.innerText = formatter.currency(this.calculateOffer());
                })
            } else {
                Briefcase.caseElement.className = "btn btn-secondary disabled text-primary";
            }
        }

        let orderedArray = this.cases.sort((a, b) => a.caseNumber - b.caseNumber);
        console.log(orderedArray)
        for (let caseElement of orderedArray) {
            this.caseContainer.appendChild(caseElement.caseElement);
        }

        displayDiv.appendChild(this.boardContainer)
    }

    calculateOffer(): number {
        let AmountActive: number = 0;
        let median: number = 0;

        for (let c of this.cases) {
            if (c.status === true) {
                AmountActive++
                if (AmountActive === 26) {
                    median = 0;
                } else {
                    median = median + c.value;
                }
            } 
        }

        return median / AmountActive; 
    }
}

dealOrNoDeal.main(); 

module formatter {
    // currency formatter: $140.23
    export function currency(currencyString: any): string {
        return currencyString.toLocaleString("en-US", { style: "currency", currency: "USD" })
    }

    export function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
};
