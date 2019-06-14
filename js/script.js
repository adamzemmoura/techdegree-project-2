/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const studentListItemElements = document.querySelectorAll('.student-item')
const itemsToShowPerPage = 10


/*** 
 * Displays only desired page by hiding all the unwanted items in the list.
 * 
 * This method takes a list and page number as parameters and based on the desired
 * number of items per page, which can be set in itemsToShowPerPage, calculates which 
 * items to show and sets their display property to 'block'. All others display properties
 * are set to 'none', hiding them from view. This method should be called each time a new 
 * page is to be shown ie. when a user clicks one of the pagination buttons.
 * 
 * @param   list  {[string]}  The complete list of items.
 * @param   page  {number}    The page number to show.
***/
function showPage(list, page) {
   const startIndex = (page * itemsToShowPerPage) - itemsToShowPerPage
   const endIndex = page * itemsToShowPerPage

   studentListItemElements.forEach( (item, index) => {
      if(index >= startIndex && index < endIndex) {
         item.style.display = "block"
      } else {
         item.style.display = "none"
      }
   })
}


/*** 
*  Creates pagination links and appends them to bottom of page
*
*  This method creates the required HTML to display the pagination links and appends them to
*  the bottom of the page. Each link comprises an anchor tag with a clickHandler, which applies
*  the 'active' CSS class to the newly active page. showPage() is then called passing the newly 
*  selected page number as an argument. The first page is set to active by default.
*
*  @param   list  {[string]}  The full list to be paginated.
***/
function appendPageLinks(list) {
   
   let div = document.createElement("div")
   div.classList.add("pagination")
   
   let ul = document.createElement('ul')
     
   const numberOfListItemsRequired = Math.floor(list.length / itemsToShowPerPage)

   // create anchor element for each page
   for(let i = 0; i < numberOfListItemsRequired; i++) {

      let anchorTags = []

      let newAnchorElement = document.createElement("a")
      newAnchorElement.href = "#"
      newAnchorElement.innerHTML = `${i + 1}`

      // add 'active' class to the first link initially
      if (i === 0) {
         newAnchorElement.classList.add("active")
         
      } 

      anchorTags.push(newAnchorElement)

      // add click event listener to update selected page
      anchorTags.forEach( tag => {
         
         tag.addEventListener('click', (e) => {
            document.querySelectorAll('div.pagination a.active').forEach( element => element.classList.remove('active'))
            const clickedAnchor = e.target 
            clickedAnchor.classList.add("active")
            showPage(studentListItemElements, clickedAnchor.innerHTML)
         })
         const li = document.createElement("li")
         li.appendChild(tag)
         ul.appendChild(li)
      })
   }

   div.appendChild(ul)
   document.querySelector('.page').appendChild(div)
   
}

// When DOM content loaded, show page 1 by default and append page links
document.addEventListener('DOMContentLoaded', () => {   
   showPage(studentListItemElements, 1)
   appendPageLinks(studentListItemElements)
})