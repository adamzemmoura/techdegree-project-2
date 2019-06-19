# techdegree-project-2

## The Task

Add pagination to an exisiting webpage, making navigation through a long list of students more user-friendly.

Using vanilla javascript, I added the following functionality : 

- A maximum of 10 students per page.
- Pagination controls at the bottom of the list to traverse the list.

## Extra Credit

Here is a list of the additional functionality I added for extra credit :

- A search box which can be used to filter the list based on search text. Filters in real time as a user types as well as in response to clicking the search button.
- Pagination works for the search results.
- In the case of no search results, the pagination controls are removed and a no results message displayed to the user.
- The list heading updates dynamically to reflect the number of displayed students.

## Skills, techniques & process

In order to complete this project, I used a javascript's querySelector() & querySelectorAll() methods to select required elements in the DOM. Extensive use ES6 syntax including use of 'const' and 'let' as appropriate in variable declaration, the higher order function filter is used to implement the search functionality and forEach() used with arrow functions for cleaner, more readable & maintainable code.  In terms of general process, the code is broken down into smaller helper methods where appropriate to futher help readability as well as code reuse.  Methods and parameters are thoughtfully named in order to be as descriptive as possible. An updateUI() method was created so that method calls which result in changes to the UI can be called from one central place. I also added comments following the Javascript documentation guidelines. 

