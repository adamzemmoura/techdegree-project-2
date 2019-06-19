/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

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

   hideAllStudents()

   list.forEach( (item, index) => {
      if(index >= startIndex && index < endIndex) {
         item.style.display = "block"
      } 
   })
}

/*** 
 * Hides all the students in the list.
 * 
 * A helper function used to hide all the students in the list but setting their display
 * property to 'none'.
 * **/
function hideAllStudents() {
   Array.from(studentListItemElements).forEach(item => item.style.display = "none")
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

   const page = document.querySelector('.page')
   const existingPaginationControls = document.querySelector('.pagination')
   
   // remove existing pagination controls if there are any to avoid creation of more than one.
   if (existingPaginationControls) {
      page.removeChild(existingPaginationControls)
   }
   
   let div = document.createElement("div")
   div.classList.add("pagination")
   
   let ul = document.createElement('ul')

   let listToDisplay = list 
   if (userIsSearching()) {
      listToDisplay = applyFilterToList(getSearchText(), list)
   }
     
   let numberOfListItemsRequired = Math.floor(listToDisplay.length / itemsToShowPerPage)
   if ((listToDisplay.length % itemsToShowPerPage) > 0) { numberOfListItemsRequired += 1 }
   if (numberOfListItemsRequired === 0) { numberOfListItemsRequired = 1 }

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
            updateUI(clickedAnchor.innerHTML)
         })
         const li = document.createElement("li")
         li.appendChild(tag)
         ul.appendChild(li)
      })
   }

   div.appendChild(ul)
   page.appendChild(div)
   
}

/*** 
 * Adds a search input to the page which has a clickable button and also filters as a user types.
 * 
 * This method creates the required markup to create a search/filter box. A search button is created
 * with an onClick event, which calls updateUI() to ensure the student list updates in sync with a 
 * the user entered search text. This method should be called first when the page loads to ensure there
 * the search bar exists before other methods, which check its contents, are called.
 * **/
function appendSearchBar() {
   
   // create the container div for search box
   const div = document.createElement("div")
   div.classList.add("student-search")

   // create and append the search input
   const input = document.createElement("input")
   input.placeholder = "Search for students..."
   div.appendChild(input)
   input.addEventListener('keyup', () => updateUI() )

   // create and append the search button 
   const button = document.createElement("button")
   button.innerText = "Search"
   div.appendChild(button)

   // create search button click handler 
   button.addEventListener('click', () => updateUI() )

   document.querySelector('.page-header').appendChild(div)
}

/*** 
 * Applies a filter to a given array, returning a new array with items containing given filter text.
 * 
 * @param   filterText {string}  The text to search array items for
 * @param   list  {[string]}  The array to apply the filter to.
 * @return  {[string]}  A new array containing only the items from list, containing the filterText.
 * 
 * **/
function applyFilterToList(filterText, list) {
   return Array.from(list).filter(item => item.innerText.toLowerCase().includes(filterText.toLowerCase()))
}

/*** 
 * Gets the contexts of the search input.
 * 
 * @return  {string} The contents of the search box input.
 * **/
function getSearchText() {
   return document.querySelector('input').value
}

/*** 
 * Determines whether the user is currently searching / filtering.
 * 
 * This method calls getSearchText() and checks the length of the result. If search text length > 0 ie. there
 * is some search text, the method returns true and vise versa.
 * 
 * @return  {boolean}   True if the user is searching, false if not.
 * **/
function userIsSearching() {
   return getSearchText().length > 0
}

/*** 
 * Updates user interface based on search box input (if any).
 * 
 * This method updates the students list based on whether the user is currently searching or not,
 * the pagination controls based on the number of pages corresponding to search results (if any) 
 * and updates the heading text to include number of students displayed.
 * ***/
function updateUI(page = 1) {
   let listToDisplay = studentListItemElements
   
   // check if the user is searching
   if( userIsSearching() ) {
      listToDisplay = applyFilterToList(getSearchText(), studentListItemElements)
   }
   showPage(listToDisplay, page)

   if (page === 1) {
      appendPageLinks(listToDisplay)
   }
   
   updateHeadingTextForList(listToDisplay)

   shouldShowNoResultsMessage(listToDisplay.length === 0)

}

/*** 
 * Updates the page to show / hide the no results message.
 * 
 * This method is called so show or hide the 'no results' message. Passing an argument of true
 * shows the the message and removes the pagination controls. Passing false, removes the no results
 * message from the DOM if present. No results message includes the entered search text.
 * 
 * @bool {boolean}   True to display the 'no results' message, including the search text, false to remove it if present.
 * **/
function shouldShowNoResultsMessage(bool) {
   const studentList = document.querySelector('.student-list')
   const resultsLi = document.querySelector('#no-results')

   if (bool) {
      const message = `No results for '${getSearchText()}'`

      if (resultsLi) {
         resultsLi.innerText = message
      } else {
         const li = document.createElement('li')
         li.classList.add("student-item")
         li.id = "no-results"
         
         const innerHTML = `
            <div>
               <h2>${message}</h2>
            </div>
         `
         li.innerHTML = innerHTML
         studentList.appendChild(li)
      }

      // remove pagination 
      const paginationControls = document.querySelector('.pagination')
      document.querySelector('.page').removeChild(paginationControls)
      
   } else {
      
      if (resultsLi) {
         studentList.removeChild(resultsLi)
      }
      
   }
}

/*** 
 * Updates the list heading depending on the number of students currently displayed.
 * 
 * This method updates the heading text based on currently display.  If there are more 
 * than one student in the list or zero, the heading will read students, plural. If there
 * is just one student, the heading text will be updated to student, singular. The number
 * of students is also prepended to the heading text.
 * 
 * @param   list  {[string]}  The student list currently being displayed on the page. 
 * **/
function updateHeadingTextForList(list) {
   const headingText = (list.length === 1) ? "1 Student" : `${list.length} Students`
   document.querySelector('h2').innerText = headingText
}

// When DOM content loads, show page 1 by default and append page links
// appendSearchBar() should always be called first as updateUI() assumes there is a search bar
document.addEventListener('DOMContentLoaded', () => {   
   appendSearchBar()
   updateUI()
})