<?php
/**
 * Template Name: Single
 * This file for single post
 */
?>

<div id="posts"></div>

<script>
	document.addEventListener('DOMContentLoaded', function() {
		fetch('https://your-wordpress-site.com/wp-json/wp/v2/posts')
			.then(response => response.json())
			.then(posts => {
				const postsContainer = document.getElementById('posts');
				posts.forEach(post => {
					const postElement = document.createElement('div');
					postElement.innerHTML = `
						<h2>${post.title.rendered}</h2>
						<p>${post.excerpt.rendered}</p>
						<a href="${post.link}">Read more</a>
					`;
					postsContainer.appendChild(postElement);
				});
			})
			.catch(error => console.error('Error fetching posts:', error));
	});
</script>