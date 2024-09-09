const { ui, quiz } = require("./app");

ui.btnNext.addEventListener("click", function () {
  if (quiz.sorular.length != quiz.soruIndex) {
    ui.soruGoster(quiz.soruGetir());

    console.log(quiz);
  } else {
    console.log("quiz bitti");
  }
});
