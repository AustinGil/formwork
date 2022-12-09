<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { enhanceForm } from './enhance.js';

const API_ENDPOINT = '';
// const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/todos/';
// const API_ENDPOINT = 'https://httpstat.us/400';
// const API_ENDPOINT = 'https://httpstat.us/301';
// const API_ENDPOINT = 'http://localhost:3001';

const state = reactive({
  js: true,
});

onMounted(() => {
  const form = document.querySelector('form');
  if (!form) return;
  enhanceForm(form);
});
</script>

<template>
  <main :class="state.js ? 'js' : 'no-js'">
    <!-- 
    Click Example
    Search Example
    The perfect input
    Non-JS Examples
    Enhance form
    Enhance input validation
    Client vs server validation
    Enhance fetch
    Nested data structures
    Convert to Vue handlers (avoid memory leaks)
    Enhance server 
    -->
    <button @click="state.js = !state.js">
      Toggle JS class ({{ state.js ? '.js' : '.no-js' }})
    </button>
    <br />

    <form :action="API_ENDPOINT">
      <!-- <div class="control">
        <label for="name">Name</label>
        <div class="control__input">
          <input id="name" name="name" required />
        </div>
      </div>
      <div class="control">
        <label for="email">Email</label>
        <div class="control__input">
          <input id="email" type="email" name="email" required />
        </div>
      </div>
      <div class="control">
        <label for="select">Select</label>
        <div class="control__input">
          <select id="select" name="select" required>
            <option value="" />
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </div>
      </div>

      <br /> -->

      <fieldset>
        <legend>What's your fave frontend language</legend>
        <div class="cards">
          <div class="card card--html">
            <svg width="48" height="48" viewBox="0 0 32 32">
              <title>HTML Logo</title>
              <path
                fill="#e44f26"
                d="M5.902 27.201L3.655 2h24.69l-2.25 25.197L15.985 30L5.902 27.201z"
              />
              <path
                fill="#f1662a"
                d="m16 27.858l8.17-2.265l1.922-21.532H16v23.797z"
              />
              <path
                fill="#fff"
                d="m15 20.681l-8-4.809v-1.743l8-4.81v2.697L9.897 15L15 17.986v2.695zm2-.003v-2.694L22.14 15L17 12.017V9.322l8 4.787v1.782l-8 4.787z"
              />
            </svg>
            <label for="html">HTML</label>
            <input
              id="html"
              type="radio"
              name="fe-fave"
              aria-describedby="html-description"
              class="visually-hidden"
            />
            <p id="html-description">The bones of any good website</p>
          </div>
          <div class="card card--css">
            <svg width="48" height="48" viewBox="0 0 32 32">
              <title>CSS Logo</title>
              <path
                fill="#1572b6"
                d="M5.902 27.201L3.656 2h24.688l-2.249 25.197L15.985 30L5.902 27.201z"
              />
              <path
                fill="#33a9dc"
                d="m16 27.858l8.17-2.265l1.922-21.532H16v23.797z"
              />
              <path
                fill="#fff"
                d="M16 13.191h4.09l.282-3.165H16V6.935h7.75l-.074.829l-.759 8.518H16v-3.091z"
              />
              <path
                fill="#ebebeb"
                d="m16.019 21.218l-.014.004l-3.442-.93l-.22-2.465H9.24l.433 4.853l6.331 1.758l.015-.004v-3.216z"
              />
              <path
                fill="#fff"
                d="m19.827 16.151l-.372 4.139l-3.447.93v3.216l6.336-1.756l.047-.522l.537-6.007h-3.101z"
              />
              <path
                fill="#ebebeb"
                d="M16.011 6.935v3.091H8.545l-.062-.695l-.141-1.567l-.074-.829h7.743zM16 13.191v3.091h-3.399l-.062-.695l-.14-1.567l-.074-.829H16z"
              />
            </svg>
            <label for="css">CSS</label>
            <input
              id="css"
              type="radio"
              name="fe-fave"
              aria-describedby="css-description"
              class="visually-hidden"
            />
            <p id="css-description">Styles to make your mamma proud</p>
          </div>
          <div class="card card--js">
            <svg width="48" height="48" viewBox="0 0 32 32">
              <title>HTML Logo</title>
              <path fill="#f5de19" d="M2 2h28v28H2z" />
              <path
                d="M20.809 23.875a2.866 2.866 0 0 0 2.6 1.6c1.09 0 1.787-.545 1.787-1.3c0-.9-.716-1.222-1.916-1.747l-.658-.282c-1.9-.809-3.16-1.822-3.16-3.964c0-1.973 1.5-3.476 3.853-3.476a3.889 3.889 0 0 1 3.742 2.107L25 18.128A1.789 1.789 0 0 0 23.311 17a1.145 1.145 0 0 0-1.259 1.128c0 .789.489 1.109 1.618 1.6l.658.282c2.236.959 3.5 1.936 3.5 4.133c0 2.369-1.861 3.667-4.36 3.667a5.055 5.055 0 0 1-4.795-2.691Zm-9.295.228c.413.733.789 1.353 1.693 1.353c.864 0 1.41-.338 1.41-1.653v-8.947h2.631v8.982c0 2.724-1.6 3.964-3.929 3.964a4.085 4.085 0 0 1-3.947-2.4Z"
              />
            </svg>
            <label for="js">JavaScript</label>
            <input
              id="js"
              type="radio"
              name="fe-fave"
              aria-describedby="js-description"
              class="visually-hidden"
            />
            <p id="js-description">Fancy-pantsy movements and stuff</p>
          </div>
        </div>
      </fieldset>

      <br />

      <fieldset>
        <legend>Favorite Starter Pokemon</legend>

        <div class="flex justify-between">
          <div class="control">
            <input
              id="bulbasaur"
              type="radio"
              name="selection"
              value="bulbasaur"
            />
            <label for="bulbasaur">Bulbasaur</label>
          </div>

          <div class="control">
            <input
              id="charmander"
              type="radio"
              name="selection"
              value="charmander"
            />
            <label for="charmander">Charmader</label>
          </div>

          <div class="control">
            <input
              id="squirtle"
              type="radio"
              name="selection"
              value="squirtle"
            />
            <label for="squirtle">Squirtle</label>
          </div>
        </div>

        <div class="pokemon pokemon--bulbasaur">
          <img
            src="img/bulbasaur.png"
            width="300"
            height="300"
            alt="Bulbasaur"
          />
          <p>
            Bulbasaur can be seen napping in bright sunlight. There is a seed on
            its back. By soaking up the sun's rays, the seed grows progressively
            larger.
          </p>
          <ul>
            <li>Height: 2' 04"</li>
            <li>Weight: 15.2 lbs</li>
            <li>Type: Grass/Poison</li>
            <li>Weaknesses: Fire, Psychic, Flying, Ice</li>
          </ul>
        </div>

        <div class="pokemon pokemon--charmander">
          <img
            src="img/charmander.png"
            width="300"
            height="300"
            alt="Charmander"
          />
          <p>
            The flame that burns at the tip of its tail is an indication of its
            emotions. The flame wavers when Charmander is enjoying itself. If
            the Pokémon becomes enraged, the flame burns fiercely.
          </p>
          <ul>
            <li>Height:1' 08"</li>
            <li>Weight: 19.8 lbs</li>
            <li>Type: Water</li>
            <li>Weaknesses: Grass, Electric</li>
          </ul>
        </div>

        <div class="pokemon pokemon--squirtle">
          <img src="img/squirtle.png" width="300" height="300" alt="Squirtle" />
          <p>
            Squirtle's shell is not merely used for protection. The shell's
            rounded shape and the grooves on its surface help minimize
            resistance in water, enabling this Pokémon to swim at high speeds.
          </p>
          <ul>
            <li>Height: 2' 00"</li>
            <li>Weight: 18.7 lbs</li>
            <li>Type: Fire</li>
            <li>Weaknesses: Water, Ground, Rock</li>
          </ul>
        </div>
      </fieldset>

      <!-- Challenge: Do the same with checkboxes -->

      <br />

      <div class="control">
        <label for="file">File</label>
        <div class="control__input">
          <input id="file" type="file" name="file" />
        </div>
      </div>

      <br />

      <fieldset>
        <legend>Address</legend>
        <div class="control">
          <label for="country">Country</label>
          <div class="control__input">
            <input id="country" name="country" />
          </div>
        </div>
        <div class="control">
          <label for="region">Region</label>
          <div class="control__input">
            <input id="region" name="region" />
          </div>
        </div>
        <div class="control">
          <label for="city">City</label>
          <div class="control__input">
            <input id="city" name="city" />
          </div>
        </div>
        <div class="control">
          <label for="street">Street</label>
          <div class="control__input">
            <input id="street" name="street" />
          </div>
        </div>
      </fieldset>

      <br />

      <div class="control">
        <input
          id="checkme"
          type="checkbox"
          name="learned"
          class="switch"
          required
        />
        <label for="checkme">I learned something cool!</label>
      </div>

      <button type="submit">Submit</button>
    </form>
  </main>
</template>

<style>
main {
  max-inline-size: 48rem;
  margin-inline: auto;
  border: 0.125rem solid;
  padding: 0.75rem;
  background: #fff;
}
</style>
