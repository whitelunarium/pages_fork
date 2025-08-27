---
layout: pico 
title: Pico Test Page
description: Test Page for Pico Theme
permalink: /pico
---
<h1>Pico CSS Theme Test</h1>
<p>This is a comprehensive test page to verify the Pico CSS theme implementation across all common HTML elements and components.</p>

<section>
    <h2>Typography</h2>
    
    <h3>Headings</h3>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>

    <h3>Text Formatting</h3>
    <p>This is a regular paragraph with some <strong>bold text</strong>, <em>italic text</em>, and <code>inline code</code>. You can also use <del>strikethrough text</del> and <mark>highlighted text</mark>.</p>
    
    <p>Here's another paragraph to test spacing and flow. <small>This is small text.</small> <sup>Superscript</sup> and <sub>subscript</sub> are also supported.</p>

    <h3>Links</h3>
    <p>
        <a href="#" role="button">Button Link</a>
        <a href="#">Regular Link</a>
        <a href="#" class="secondary">Secondary Link</a>
        <a href="#" class="contrast">Contrast Link</a>
    </p>
</section>

<section>
    <h2>Lists</h2>
    
    <div class="grid">
        <div>
            <h3>Unordered List</h3>
            <ul>
                <li>First item</li>
                <li>Second item with longer description</li>
                <li>Third item
                    <ul>
                        <li>Nested item 1</li>
                        <li>Nested item 2</li>
                    </ul>
                </li>
            </ul>
        </div>
        
        <div>
            <h3>Ordered List</h3>
            <ol>
                <li>First ordered item</li>
                <li>Second ordered item</li>
                <li>Third ordered item
                    <ol>
                        <li>Nested ordered item</li>
                        <li>Another nested item</li>
                    </ol>
                </li>
            </ol>
        </div>
    </div>
</section>

<section>
    <h2>Forms</h2>
    
    <form>
        <div class="grid">
            <label for="firstname">
                First name
                <input type="text" id="firstname" name="firstname" placeholder="First name" required>
            </label>
            
            <label for="lastname">
                Last name
                <input type="text" id="lastname" name="lastname" placeholder="Last name" required>
            </label>
        </div>
        
        <label for="email">
            Email address
            <input type="email" id="email" name="email" placeholder="Email address" required>
            <small>We'll never share your email with anyone else.</small>
        </label>
        
        <label for="password">
            Password
            <input type="password" id="password" name="password" required>
        </label>
        
        <label for="select">
            Select
            <select id="select" required>
                <option value="" selected>Select…</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
            </select>
        </label>
        
        <label for="textarea">
            Textarea
            <textarea id="textarea" name="textarea" placeholder="Write a comment…" required></textarea>
        </label>
        
        <fieldset>
            <legend><strong>Checkboxes</strong></legend>
            <label for="checkbox1">
                <input type="checkbox" id="checkbox1" name="checkbox1" checked>
                Checkbox 1
            </label>
            <label for="checkbox2">
                <input type="checkbox" id="checkbox2" name="checkbox2">
                Checkbox 2
            </label>
        </fieldset>
        
        <fieldset>
            <legend><strong>Radio buttons</strong></legend>
            <label for="radio1">
                <input type="radio" id="radio1" name="radio" value="radio1" checked>
                Radio 1
            </label>
            <label for="radio2">
                <input type="radio" id="radio2" name="radio" value="radio2">
                Radio 2
            </label>
        </fieldset>
        
        <fieldset>
            <legend><strong>Switches</strong></legend>
            <label for="switch1">
                <input type="checkbox" id="switch1" name="switch1" role="switch" checked>
                Switch 1
            </label>
            <label for="switch2">
                <input type="checkbox" id="switch2" name="switch2" role="switch">
                Switch 2
            </label>
        </fieldset>
        
        <input type="submit" value="Submit">
    </form>
</section>

<section>
    <h2>Buttons</h2>
    
    <div class="grid">
        <button>Primary</button>
        <button class="secondary">Secondary</button>
        <button class="contrast">Contrast</button>
    </div>
    
    <div class="grid">
        <button class="outline">Primary outline</button>
        <button class="outline secondary">Secondary outline</button>
        <button class="outline contrast">Contrast outline</button>
    </div>
    
    <button aria-busy="true">Loading</button>
    <button disabled>Disabled</button>
</section>

<section>
    <h2>Tables</h2>
    
    <figure>
        <table>
            <thead>
                <tr>
                    <th scope="col">Feature</th>
                    <th scope="col">Status</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Typography</th>
                    <td>✅ Complete</td>
                    <td>High</td>
                    <td>All heading levels implemented</td>
                </tr>
                <tr>
                    <th scope="row">Navigation</th>
                    <td>🚧 In Progress</td>
                    <td>High</td>
                    <td>Mobile responsive needed</td>
                </tr>
                <tr>
                    <th scope="row">Forms</th>
                    <td>✅ Complete</td>
                    <td>Medium</td>
                    <td>All form elements styled</td>
                </tr>
                <tr>
                    <th scope="row">Dark Mode</th>
                    <td>✅ Complete</td>
                    <td>Low</td>
                    <td>Auto-switching enabled</td>
                </tr>
            </tbody>
        </table>
    </figure>
</section>

<section>
    <h2>Code</h2>
    
    <h3>Inline Code</h3>
    <p>Use <code>npm install</code> to install dependencies. The <code>console.log()</code> function is useful for debugging.</p>
    
    <h3>Code Block</h3>
    <pre><code>// JavaScript example
function greetUser(name) {
    console.log(`Hello, ${name}!`);
    return `Welcome to Pico CSS testing, ${name}`;
}

const user = "Developer";
greetUser(user);</code></pre>
</section>

<section>
    <h2>Blockquotes</h2>
    
    <blockquote>
        "This is a simple blockquote to test styling."
    </blockquote>
    
    <blockquote>
        "Multi-line blockquote with various formatting elements like <strong>bold text</strong> and <em>italic text</em>."
        <footer>
            <cite>— Citation Author</cite>
        </footer>
    </blockquote>
</section>

<section>
    <h2>Articles and Cards</h2>
    
    <div class="grid">
        <article>
            <header>Card Title</header>
            <p>Card content goes here. This is a simple card layout using the article element.</p>
            <footer>
                <a href="#" role="button">Action</a>
            </footer>
        </article>
        
        <article>
            <header>Another Card</header>
            <p>Another card with different content to test consistency in styling.</p>
            <footer>
                <a href="#" role="button" class="secondary">Secondary Action</a>
            </footer>
        </article>
    </div>
</section>

<section>
    <h2>Navigation</h2>
    
    <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#" aria-current="page">Current</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav>
</section>

<section>
    <h2>Progress and Loading</h2>
    
    <progress id="progress" value="75" max="100"></progress>
    <label for="progress">Progress: 75%</label>
    
    <div aria-busy="true">Loading content...</div>
</section>

<section>
    <h2>Accordions</h2>
    
    <details>
        <summary>Accordion 1</summary>
        <p>This is the content of the first accordion. It can contain any HTML elements including <strong>bold text</strong> and <a href="#">links</a>.</p>
    </details>
    
    <details>
        <summary>Accordion 2</summary>
        <p>This is the content of the second accordion.</p>
        <ul>
            <li>It can also contain lists</li>
            <li>And other complex content</li>
        </ul>
    </details>
</section>

<section>
    <h2>Keyboard and Special Elements</h2>
    
    <p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy, then <kbd>Ctrl</kbd> + <kbd>V</kbd> to paste.</p>
    
    <p>The <abbr title="HyperText Markup Language">HTML</abbr> specification is maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.</p>
    
    <dl>
        <dt>Pico CSS</dt>
        <dd>A minimal CSS framework for semantic HTML</dd>
        <dt>Semantic HTML</dt>
        <dd>HTML written to reinforce the meaning of content</dd>
    </dl>
</section>

<hr>

<footer>
    <p><small>This test page covers most common HTML elements styled by Pico CSS. Use this to verify typography, forms, navigation, tables, and interactive components across different themes and devices.</small></p>
    <p><small>Last updated: <time datetime="2024-08-27">August 27, 2024</time> | Theme: Pico CSS</small></p>
</footer>