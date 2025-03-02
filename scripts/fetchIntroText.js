$(document).ready(function() {
  // Fetch the JSON file
  $.getJSON('../assets/details/intro.json', function(data) {
    const textContainer = $('#text-container');
    const texts = data.texts;

    // Clear any existing content
    textContainer.empty();
    
    // Iterate through each text entry and create elements
    Object.keys(texts).forEach(function(key) {
      const textElement = $('<h1></h1>')
        .addClass('text ' + key)
        .html(texts[key]);
      
      // Make the "anyone" text visible by default
      if (key === 'anyone') {
        textElement.addClass('is--visible');
      }
      
      // Add the text element to the container
      textContainer.append(textElement);
    });
    
    // Re-attach click handlers for options (assuming they exist in your code)
    $('.section.intro .option').click(function() {
      $('.section.intro .option').removeClass('is--active');
      $('.section.intro .text').removeClass('is--visible');
    });
    
    $('.section.intro .option.anyone').click(function() {
      $('.section.intro .option.anyone').addClass('is--active');
      $('.section.intro .text.anyone').addClass('is--visible');
    });
    
    $('.section.intro .option.recruiters').click(function() {
      $('.section.intro .option.recruiters').addClass('is--active');
      $('.section.intro .text.recruiters').addClass('is--visible');
    });
    
    $('.section.intro .option.tech-leads').click(function() {
      $('.section.intro .option.tech-leads').addClass('is--active');
      $('.section.intro .text.tech-leads').addClass('is--visible');
    });
    
    $('.section.intro .option.backend-developers').click(function() {
      $('.section.intro .option.backend-developers').addClass('is--active');
      $('.section.intro .text.backend-developers').addClass('is--visible');
    });
    
    $('.section.intro .option.frontend-developers').click(function() {
      $('.section.intro .option.frontend-developers').addClass('is--active');
      $('.section.intro .text.frontend-developers').addClass('is--visible');
    });
    
    $('.section.intro .option.software-architects').click(function() {
      $('.section.intro .option.software-architects').addClass('is--active');
      $('.section.intro .text.software-architects').addClass('is--visible');
    });
  })
  .fail(function(jqxhr, textStatus, error) {
    console.error("Error loading texts.json: " + textStatus + ", " + error);
  });
});