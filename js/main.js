const API = 'https://5d76bf96515d1a0014085cf9.mockapi.io/quiz/'
var MyQesDATA;
const quesParent = $("#quizee");
const resParent = $("#resScore");
const btnSubmit = $("#fsubmit")

btnSubmit.click((ev)=>{
  ev.preventDefault();
  console.log("Form Submit")
  res = 0
  tQues = 0
  MyQesDATA.forEach((item,id)=>{
    
    var val = $(`input[name='Ques${item.id}']:checked`).val();
    if(val == item.answer){
      res+=1;
    }
    console.log("Result for: Ques" + item.id, item.answer, "selected: " + val)
    tQues+=1;
  })
  resParent.html(`${res}/${tQues}`)
  btnSubmit.val("See Result")
})
// <input type="radio" id="html" name="fav_language" value="HTML">
{/* <label for="html">HTML</label><br></br> */}

function OnLoadPage(){
  fetch(API)
  .then(response => response.json())
  .then(data => {
    MyQesDATA = data;
    console.log("Question DATA: ",MyQesDATA)
    initQuestion();
  })
  .catch((error) => {
    console.error('Error:', error);
    $("#Qbody").html("<h3>Somthing Went Wrong Please Refresh Page and make sure you are connected to internet.</h3>")
  });

}

function initQuestion(){
  MyQesDATA.forEach((element)=> {
    generateHtml(quesParent, element)
  });
  
}

function generateHtml(parent, data){
  console.log(data)
    let box = $('<div>').addClass("qtnBox")
    let ques = $('<h4>').text(`Q${data.id}) ${data.question}`)   
    box.append(ques)
    data.options.forEach((dt,index) => {
      generateOption(box, dt, index + 1, data.id )
    })
    parent.append(box)
}


function generateOption(parent, Options, index, quesId){
  let name = 'Ques' + quesId ;
  let opnId = 'Q'+ quesId +'opn' + index;
  let optn = $('<input>');
  optn.attr('type','radio');
  optn.attr('name', name);
  optn.attr('id', opnId);
  optn.attr('value', index);
  let label = $('<label>')
  label.attr('for', opnId)
  label.html(Options)
  let br = $('<br>')
  parent.append(optn, label, br)
}

