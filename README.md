List of used technologies:

1. Mobile first: The project was designed and developed with a mobile-first approach, prioritizing responsive design for mobile devices.

2. Adaptive layout: The layout was created considering the principles of adaptive web design, ensuring that the website adapts well to different screen sizes.

3. Bootstrap framework: The project incorporates the Bootstrap framework for front-end development. Bootstrap provides a collection of CSS and JavaScript components that simplify the process of building responsive and visually appealing web pages. By leveraging Bootstrap's grid system, pre-styled components, and responsive utilities, the project achieves consistent and responsive design across different devices and screen sizes.

4. SCSS (Sass): All styles were written in SCSS files (with the .scss extension) and imported into the main SCSS file (main.scss). SCSS is a preprocessor scripting language that enhances the functionality of CSS.

5. BEM methodology: The BEM (Block Element Modifier) methodology was followed to define and organize CSS classes on the webpage. It helps create reusable and maintainable CSS code by providing a clear naming convention and structure.


Project Description:

The project utilizes the Gulp task runner along with the following packages:

- gulp-autoprefixer: Automatically adds vendor prefixes to CSS properties for better browser compatibility.
- gulp-clean: Deletes files and folders as part of the build process.
- gulp-clean-css: Minifies and optimizes CSS files.
- gulp-concat: Concatenates multiple files into a single file.
- gulp-cssmin: Minifies CSS files.
- gulp-minify: Minifies JavaScript files.
- gulp-rename: Renames files.
- gulp-sass: Compiles SCSS files into CSS.
- sass: A Dart Sass compiler for Node.js.


To set up the project, you need to have Gulp installed globally. There are two files required:

1. package.json: Contains the project's dependencies and configuration information.
2. gulpfile.js: Contains the Gulp tasks and build process configuration.

    To install Gulp and the necessary packages for the project locally, run the following command:

    npm install

Project Build and Minification:

    The project can be built and all files minified using the following command:

    npm build

This command will compile the project and output the build files into the "dist" folder.

    To see real-time changes while working on the project, use the command:

    npm dev

   This command sets up a series of tasks, including watching for changes (watch) and triggering 
   the build process (build) to recompile the project with the changes applied in real time.


Composition of Project Participants and Tasks:

Oleksandr Lynnyk:

Developed modal windows that are responsible for creating appointment cards.
The syntax from ES6 was used to create classes. Fetch was used for AJAX requests.
Added design to the modal windows using CSS.Wrote JavaScript code that provides functionality for creating modal windows for making an appointment.
Also added text to the board: 
 When a user visits the page for the first time, the board will display the inscription No items have been added. The same inscription will be displayed if the user does not have any added cards (for example, he deleted them all)

Olexandr Sydorovych:

Designed the website header and filters section on the page.
Created a modal login window for the site, where users can enter the page after entering the correct email and password.
Wrote JavaScript code that provides functionality for the modal login page window.

Victor Moroz:

Developed cards describing a doctor's visit.
Added design to the visit cards using CSS on the pages.
Wrote JavaScript code that provides functionality for appearance, deletion, and editing of visit cards.

Composition of Project Participants and Joint Tasks:

Olexandr Sydorovych, Olexandr Lynnyk, and Victor Moroz:

Created the README.md file.
Created the gulpfile.js file.
Wrote JavaScript code that provides functionality to filter visits by name and priority.
