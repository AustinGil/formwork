<script setup>
import { onMounted } from 'vue';
import { enhanceForm } from './assets/enhance.js';

const API_ENDPOINT = '';
// const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/todos/';
// const API_ENDPOINT = 'https://httpstat.us/400';
// const API_ENDPOINT = 'https://httpstat.us/301';
// const API_ENDPOINT = 'http://localhost:3000/api';

onMounted(() => {
  const form = document.querySelector('form');

  if (!form) return;

  enhanceForm(form);
});
</script>

<template>
  <main>
    <form
      id="formid"
      method="post"
      :action="API_ENDPOINT"
      enctype="multipart/form-data"
    >
      <div class="control">
        <label for="name">Name</label>
        <input
          id="name"
          name="name"
          class="control__input"
          aria-describedby="desc"
        />
        <p id="desc">Give me a great name.</p>
      </div>
      <div class="control">
        <label for="name2">Name</label>
        <input id="name2" name="name" class="control__input" />
      </div>

      <!-- <fieldset>
        <legend>What's your fave frontend language</legend>
        <div class="cards">
          <div class="card">
            <img src="/img/html.svg" alt="HTML logo" width="48" height="48" />
            <label for="html">HTML</label>
            <input id="html" type="radio" name="fe-fave" aria-describedby="html-description" class="visually-hidden" />
            />
            <p id="html-description">The bones of any good website</p>
          </div>
          <div class="card">
            <img src="/img/css.svg" alt="CSS logo" width="48" height="48" />
            <label for="css">CSS</label>
            <input id="css" type="radio" name="fe-fave" aria-describedby="css-description" class="visually-hidden" />
            />
            <p id="css-description">Styles to make your mamma proud</p>
          </div>
          <div class="card">
            <img src="/img/javascript.svg" alt="JavaScript logo" width="48" height="48" />
            <label for="js">JavaScript</label>
            <input id="js" type="radio" name="fe-fave" aria-describedby="js-description" class="visually-hidden" />
            /> />
            <p id="js-description">Fancy-pantsy movements and stuff</p>
            </div>
            </div>
            </fieldset>
            
            <fieldset>
              <legend>Favorite Starter Pokemon</legend>
            
              <div>
                <div>
                  <input id="bulbasaur" type="radio" name="selection" value="bulbasaur" />
                  />
                  <label for="bulbasaur">Bulbasaur</label>
                </div>
                <div>
                  <div>
                    <input id="charmander" type="radio" name="selection" value="charmander" />
                    />
                    <label for="charmander">Charmader</label>
                  </div>
            
                  <div>
                    <input id="squirtle" type="radio" name="selection" value="squirtle" />
                    <label for="squirtle">Squirtle</label>
                  </div>
            
                  <div class="pokemon pokemon--bulbasaur">
                    <img src="img/bulbasaur.png" width="300" height="300" alt="Bulbasaur" />
                    />
                    <p>
                      Bulbasaur can be seen napping in bright sunlight. There is a
                      seed on its back. By soaking up the sun's rays, the seed grows
                      progressively larger.
                      </p>
                      <ul>
                        <li>Height: 2' 04"</li>
                        <li>Weight: 15.2 lbs</li>
                        <li>Type: Grass/Poison</li>
                        <li>Weaknesses: Fire, Psychic, Flying, Ice</li>
                      </ul>
                      </div>
                      
                      <div class="pokemon pokemon--charmander">
                        <img src="img/charmander.png" width="300" height="300" alt="Charmander" />
                        <p>
                          The flame that burns at the tip of its tail is an indication of
                          its emotions. The flame wavers when Charmander is enjoying
                          itself. If the Pokémon becomes enraged, the flame burns
                          fiercely.
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
                          resistance in water, enabling this Pokémon to swim at high
                          speeds.
                        </p>
                        <ul>
                          <li>Height: 2' 00"</li>
                          <li>Weight: 18.7 lbs</li>
                          <li>Type: Fire</li>
                          <li>Weaknesses: Water, Ground, Rock</li>
                        </ul>
                      </div>
                      </div>
                      </div>
      </fieldset> -->

      <button>Submit</button>
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
