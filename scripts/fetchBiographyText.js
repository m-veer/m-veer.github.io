$(document).ready(function() {
  const biographyContainer = $('#biography-container');
  
  // Fetch the JSON file
  $.getJSON('../assets/details/biography.json', function(data) {
    // Clear any existing content
    biographyContainer.empty();
    
    // Check if biography data exists
    if (data.biography) {
      // Create paragraph elements for each biography paragraph
      if (Array.isArray(data.biography)) {
        // If biography is an array of paragraphs
        data.biography.forEach(function(paragraph) {
          biographyContainer.append(`<p>${paragraph}</p><br/>`);
        });
      } else {
        // If biography is a single string
        biographyContainer.append(`<p>${data.biography}</p>`);
      }
    }
  })
  .fail(function(jqxhr, textStatus, error) {
    console.error("Error loading biography data: " + textStatus + ", " + error);
    biographyContainer.html('<p>Unable to load biography information.</p>');
  });
});
