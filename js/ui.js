function UI() {
  this.quiz_box = document.querySelector("#quiz-box");
  this.body = document.querySelector("#quiz-box #body");
  this.correctIcon = '<i class="bi bi-check-circle"></i>';
  this.inCorrectIcon = '<i class="bi bi-x-circle"></i>';
  this.btnNext = document.querySelector(".btn-next");
  this.btnStart = document.querySelector(".btn-start");
  this.btnReplay = document.querySelector(".btn-replay");
  this.btnQuit = document.querySelector(".btn-quit");
  this.btnBox = document.querySelector("#button-box");
  this.skorBox = document.querySelector("#skor-box");

  this.timeText = document.querySelector(".time-text");
  this.timeSecond = document.querySelector(".time-second");
  this.timeline = document.querySelector(".time-line");
}

UI.prototype.soruGoster = function (soru) {
  this.body.innerHTML = "";
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  const title = document.createElement("h5");
  title.classList.add("question-title");
  title.textContent = soru.soruMetni;

  const optionList = document.createElement("div");
  optionList.classList.add("option-list");

  for (let [key, value] of Object.entries(soru.cevapSecenekleri)) {
    const option = document.createElement("div");
    option.classList.add("option");
    option.addEventListener("click", optionSelected);
    const span = document.createElement("span");
    span.textContent = key + ")  " + value;
    option.appendChild(span);
    optionList.appendChild(option);
  }

  cardBody.appendChild(title);
  cardBody.appendChild(optionList);
  this.body.appendChild(cardBody);
};

UI.prototype.disableAllOption = function () {
  const options = document.querySelectorAll(".option");
  for (let option of options) {
    option.classList.add("disabled");
  }
};
UI.prototype.soruSayisiniGoster = function (soruSirasi, toplamSoru) {
  const etiket = `<span class=" badge text-bg-danger">${soruSirasi} / ${toplamSoru}</span>`;
  document.querySelector(".question-index").innerHTML = etiket;
};
UI.prototype.skoruGoster = function (dogruCevap, toplamSoru) {
  const etiket = `toplam ${toplamSoru} soruda ${dogruCevap} doğru cevap verdiniz`;
  document.querySelector(".skor-text").innerHTML = etiket;
};
// <h5 class="question-title">soru</h5>
// <div class="option-list">
//   <div class="option"><span>a</span></div>
//   <div class="option"><span>b</span></div>
//   <div class="option"><span>c</span></div>
//   <div class="option"><span>d</span></div>
