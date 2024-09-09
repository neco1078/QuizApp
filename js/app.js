// console.log(soruListesi[0].cevabiKontrolEt("d"));
// console.log(soruListesi[1].cevabiKontrolEt("c"));
// console.log(soruListesi[2].cevabiKontrolEt("a"));
// console.log(soruListesi[3].cevabiKontrolEt("d"));
const soruListesi = [
  new Soru(
    "1-hangisi hs paket yönetim uygulamasıdır?",
    { a: "node.js", b: "typescript", c: "nuget", d: "npm" },
    "d"
  ),
  new Soru(
    "2-frontend kapsamında değerlendirilmez?",
    { a: "css", b: "html", c: "sql", d: "js" },
    "c"
  ),
  new Soru(
    "3-backend kapsamında değerlendirilir?",
    { a: "node.js", b: "typescript", c: "angular", d: "react" },
    "a"
  ),
  new Soru(
    "4-hangisi java script programlama dilini kullanmaz",
    { a: "react", b: "angular", c: "vue.js", d: "asp.net" },
    "d"
  ),
];

const quiz = new Quiz(soruListesi);
// console.log(quiz.soruGetir());
const ui = new UI();

ui.btnStart.addEventListener("click", function () {
  startTimer(10);
  startTimerline();
  ui.quiz_box.classList.add("active");
  ui.btnBox.classList.remove("active");
  ui.soruGoster(quiz.soruGetir());
  ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
  ui.btnNext.classList.remove("show");
});

ui.btnNext.addEventListener("click", function () {
  if (quiz.sorular.length != quiz.soruIndex) {
    startTimer(10);
    startTimerline();
    ui.soruGoster(quiz.soruGetir());
    ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    ui.btnNext.classList.remove("show");
    //console.log(quiz);
  } else {
    ui.skorBox.classList.add("active");
    ui.quiz_box.classList.remove("active");
    ui.skoruGoster(quiz.dogruCevapSayisi, quiz.sorular.length);
  }
});

function optionSelected(e) {
  clearInterval(counter);
  clearInterval(counterline);
  let selectedElement = e.target;

  if (selectedElement.nodeName == "SPAN") {
    selectedElement = selectedElement.parentElement;
  }

  const cevap = e.target.textContent[0];
  const soru = quiz.soruGetir();
  if (soru.cevabiKontrolEt(cevap)) {
    quiz.dogruCevapSayisi += 1;
    selectedElement.classList.add("correct");
    selectedElement.insertAdjacentHTML("beforeend", ui.correctIcon);
  } else {
    selectedElement.classList.add("incorrect");
    selectedElement.insertAdjacentHTML("beforeend", ui.inCorrectIcon);
  }
  quiz.soruIndex += 1;
  ui.disableAllOption();
  ui.btnNext.classList.add("show");
}

ui.btnQuit.addEventListener("click", function () {
  window.location.reload();
});
ui.btnReplay.addEventListener("click", function () {
  quiz.soruIndex = 0;
  quiz.dogruCevapSayisi = 0;
  //start button
  ui.btnStart.click();
  ui.skorBox.classList.remove("active");
  // ui.skoruGoster(quiz.dogruCevapSayisi, quiz.sorular.length);
});

let counter;
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    ui.timeSecond.textContent = time;
    time--;
    if (time < 0) {
      clearInterval(counter);
      ui.timeText.textContent = "Süre Bitti";
      ui.disableAllOption();
      quiz.soruIndex += 1;
      ui.btnNext.classList.add("show");
    }
  }
}

let counterline;
function startTimerline() {
  let line_width = 0;
  counterline = setInterval(timer, 20);
  function timer() {
    line_width += 1;
    ui.timeline.style.width = line_width + "px";
    if (line_width > 498) {
      clearInterval(counterline);
    }
  }
}
