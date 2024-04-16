document.addEventListener('DOMContentLoaded', () => {
    // Listen for form submission
    const form = document.getElementById('github-form');
    form.addEventListener('submit', searchUsers);
  });
  
  // Deliverable 1 //Search GitHub for users by name
  function searchUsers(event) {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Get search term from input field
    const searchTerm = document.getElementById('search').value;
    // Construct URL for GitHub user search API
    const userSearchUrl = `https://api.github.com/search/users?q=${searchTerm}`;
  
    // Fetch data from GitHub user search API
    fetch(userSearchUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Deliverable 2 // Display information about the users to the page
        displayUsers(data.items);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  
  // Deliverable 2 // Display information about the users to the page
  function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear previous user list
  
    // Iterate over each user and create list item with link to user's profile
    users.forEach(user => {
      const listItem = document.createElement('li');
  
      // Create image element for user avatar
      const avatarImg = document.createElement('img');
      avatarImg.src = user.avatar_url;
      avatarImg.alt = `${user.login} avatar`;
      listItem.appendChild(avatarImg);
  
      // Create anchor element for user profile link
      const userLink = document.createElement('a');
      userLink.href = user.html_url;
      userLink.textContent = user.login;
      listItem.appendChild(userLink);
      
      // Append list item to user list
      userList.appendChild(listItem);
  
      // Add event listener to each user link to fetch and display user repositories
      userLink.addEventListener('click', () => {
        fetchUserRepos(user.login);
      });
    });
  }
  
  // Deliverable 3 // Fetch and display repositories for a specific user
  function fetchUserRepos(username) {
    // Construct URL for GitHub user repos API
    const userReposUrl = `https://api.github.com/users/${username}/repos`;
  
    // Fetch data from GitHub user repos API
    fetch(userReposUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Deliverable 4 // Display all the repositories for the user on the page
        displayUserRepos(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  
  // Deliverable 4 // Display all the repositories for the user on the page
  function displayUserRepos(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = ''; // Clear previous repositories list
  
    // Iterate over each repository and create list item with link to repository
    repos.forEach(repo => {
      const listItem = document.createElement('li');
      const repoLink = document.createElement('a');
      repoLink.href = repo.html_url;
      repoLink.textContent = repo.name;
      listItem.appendChild(repoLink);
      reposList.appendChild(listItem);
    });
  }
  