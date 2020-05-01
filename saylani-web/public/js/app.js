//Get button
const mybutton = document.getElementById('myBtn');

//When the user scrolls down 20px from the top of document, show thw button
window.onscroll = () => {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    mybutton.style.display = 'flex';
  } else {
    mybutton.style.display = 'none';
  }
};

//when the user clicks on the button scroll to the top of the document
mybutton.addEventListener('click', () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0;
});
