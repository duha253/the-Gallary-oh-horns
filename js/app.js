'use strict';
//let seEl=document.getElementsByTagName('select');
let keyArr=[];

function Horns(horn) {
  this.image_url= horn.image_url;
  this.keyword=horn.keyword;
  this.title=horn.title;
  this.description=horn.description;
  this.horns=horn.horns;
  if(!keyArr.includes(this.keyword)) {
    keyArr.push(this.keyword);
  }
}

Horns.prototype.cloneRender = function () {
  let clonedDiv = $('.photo-template').clone();
  clonedDiv.find('h2').text(this.title);
  clonedDiv.find('p').text(this.description);
  clonedDiv.find('img').attr('src', this.image_url);
  clonedDiv.removeClass('photo-template');
  clonedDiv.attr('class', this.keyword);
  $('section').append(clonedDiv);
};


const ajaxSettings = {
  method: 'get',
  dataType: 'json',
};


$.ajax('data/page-1.json', ajaxSettings).then((data) => {
  data.forEach((horn) => {
    let hornObject = new Horns(horn);

    hornObject.cloneRender();
  });
});
let optEl;
for (let i = 0; i < keyArr.length; i++) {
  optEl=document.createElement('option');
  optEl.setAttribute('value',keyArr[i]);
  optEl.textContent=keyArr[i];
  $('#select').append(optEl);
}

$('#select').on('change',function() {
  $('div').css('display','none');
  let str=$('#select').val();
  for (let i = 0; i < keyArr.length; i++) {
    if (keyArr[i]===str);
    {
      $('.'+str).css('display','block');
    }
  }

});


