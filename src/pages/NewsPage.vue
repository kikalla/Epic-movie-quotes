<template>
  <PageHeader></PageHeader>
  <div
    v-if="showQuoteForm"
    class="w-[56rem] h-[44rem] px-8 bg-[#11101A] flex flex-col absolute top-28 left-[29rem] rounded-xl text-white"
  >
    <img
      @click="showQuoteForm = false"
      class="absolute right-8 top-9 cursor-pointer"
      src="@/assets/close.svg"
      alt="close"
    />

    <div class="flex flex-col items-center mt-8">
      <h2 class="text-2xl font-medium">Write New Quote</h2>
      <div class="border-t border-[#efefef] opacity-20 my-6 w-[108%]"></div>
    </div>

    <form @submit.prevent="addQuote">
      <div
        class="border-[#6C757D] border rounded-lg flex justify-between items-start pt-2 my-5"
      >
        <textarea
          v-model="quoteEn"
          required
          name="quote-en"
          class="bg-[#11101A] h-[5.5rem] outline-none ml-2 w-11/12 placeholder:text-white placeholder:text-lg resize-none"
          placeholder="Start create new quote
"
        ></textarea>
        <p class="mr-4 text-[#6C757D]">Eng</p>
      </div>

      <div
        class="border-[#6C757D] border rounded-lg flex justify-between items-start pt-2 mb-5"
      >
        <textarea
          v-model="quoteKa"
          required
          name="quote-ka"
          class="bg-[#11101A] h-[5.5rem] outline-none ml-2 w-11/12 placeholder:text-white placeholder:text-lg resize-none"
          placeholder="ახალი ციტატა"
        ></textarea>
        <p class="mr-4 text-[#6C757D]">ქარ</p>
      </div>

      <div
        class="border-[#6C757D] border rounded-lg flex items-center h-[5.5rem] mb-6"
      >
        <img class="mx-4" src="@/assets/camera.svg" alt="camera" />
        <p class="text-xl">Drag & drop your image here or</p>
        <label
          class="bg-[#9747FF66] cursor-pointer text-xl p-2 ml-2 z-10"
          for="image"
          >Choose file
        </label>

        <input
          @change="handleChange"
          required
          class="w-[1px] h-[1px] relative right-1 z-0"
          id="image"
          name="image"
          type="file"
        />
      </div>
      <div class="w-full relative">
        <div
          @click="showMovies = !showMovies"
          class="flex items-center justify-between bg-black w-full h-[5.5rem] rounded-md mb-10"
        >
          <div class="flex items-center">
            <img class="w-8 h-8 mx-6" src="@/assets/movie.svg" alt="movie" />
            <p class="text-2xl">Choose movie</p>
            <input
              class="bg-transparent outline-none h-[1px] w-[1px]"
              required
              type="text"
              v-model="movieId"
            />
          </div>
          <img class="mr-6" src="@/assets/downArrow.svg" alt="arrow" />
        </div>
        <div
          v-if="showMovies"
          class="absolute overflow-scroll top-28 bg-black w-full h-[15rem] rounded-md"
        >
          <div
            v-for="movie in usersMovies"
            :key="movie"
            @click="(movieId = movie.id), (showMovies = false)"
          >
            <div class="flex items-center">
              <img
                class="w-52 h-32 m-6 rounded-md object-cover"
                :src="BACK_URL_IMAGE + '/storage/' + movie.image"
                alt=""
              />
              <div class="flex flex-col">
                <p class="text-2xl mb-4">{{ movie.title.en }}</p>
                <p class="text-2xl">director: {{ movie.director.en }}</p>
              </div>
            </div>
            <div class="border-t border-[#efefef] opacity-20 my-3 w-full"></div>
          </div>
        </div>
      </div>

      <RedButton class="py-2 rounded-md text-xl w-full">Post</RedButton>
    </form>
  </div>
  <div
    class="w-full h-screen pt-24 bg-[#0D0B14]"
    @click="showQuoteForm = false"
  >
    <div class="flex">
      <div class="w-1/5 h-[80vh] pl-16 pt-6 text-white bg-[#0D0B14]">
        <UserInfo></UserInfo>
        <div @click="newsRoute" class="flex items-center my-11 ml-3">
          <img src="@/assets/home.svg" alt="home" />
          <a class="text-2xl ml-11">News feed</a>
        </div>
        <div @click="moviesRoute" class="flex items-center ml-3 cursor-pointer">
          <img src="@/assets/activeMovie.svg" alt="home" />
          <a class="text-2xl ml-11">List of movies</a>
        </div>
      </div>

      <div class="w-4/5 pt-8 px-20 bg-[#0D0B14] text-white">
        <div class="flex items-center">
          <div
            @mousedown="observee"
            id="addQuote"
            class="flex items-center w-[49rem] h-[3.25rem] bg-[#24222F] rounded-lg"
          >
            <img
              @mousedown="showQuoteForm = true"
              class="h-6 ml-4"
              src="@/assets/pancil.svg"
              alt=""
            />
            <p @mousedown="showQuoteForm = true" class="ml-2 text-xl">
              Write new quote
            </p>
          </div>
          <div id="searchDiv" class="flex items-center h-[3.25rem] w-40 ml-6">
            <img class="h-6 mr-2" src="@/assets/search.png" alt="" />
            <form @submit.prevent="search">
              <input
                v-model="inputSearch"
                @focus="inputStyle()"
                @focusout="inputStyle()"
                id="searchInput"
                class="h-[3.25rem] bg-transparent text-xl outline-none w-full"
                type="text"
                placeholder="Search by"
              />
            </form>
          </div>
        </div>
        <div class="overflow-scroll h-[81vh] mt-4" v-if="show" id="quotes">
          <div
            v-for="(quote, index) in quotes"
            :key="quote"
            class="mt-6 bg-[#0D0B14] text-white"
            :id="'quote' + quote.id"
          >
            <div
              class="w-[55rem] h-[59rem] px-8 pt-4 bg-[#11101A] flex flex-col rounded-xl text-white"
            >
              <div class="flex items-center">
                <img
                  :src="quote.creatorImage"
                  class="w-[3.75rem] h-[3.75rem] rounded-[50%] object-cover"
                  alt="profile"
                />
                <p class="text-xl ml-4">{{ quote.creatorUsername }}</p>
              </div>
              <div class="h-12 flex justify-between items-center my-5">
                <p class="bg-[#11101A] ml-2 w-11/12 text-xl">
                  "{{ quote.quote.en }}"-{{ quote.movieTitle }}
                </p>
              </div>

              <img
                class="rounded-xl mt-6 w-full h-[28rem] object-cover"
                :src="BACK_URL_IMAGE + '/storage/' + quote.image"
                alt=""
              />
              <div class="flex items-center mt-3">
                <div class="flex items-center mr-8">
                  <p class="text-xl mr-3">{{ quote.comment_number }}</p>
                  <img src="@/assets/comment.svg" alt="comment" />
                </div>
                <div
                  @click="likeDislike(quote.id, index)"
                  class="flex items-center mr-8 cursor-pointer"
                >
                  <p class="text-xl mr-3">{{ quote.likes }}</p>
                  <img
                    v-if="quote.liked"
                    src="@/assets/activeLike.svg"
                    alt="like"
                  />
                  <img v-else src="@/assets/like.svg" alt="like" />
                </div>
              </div>
              <div class="overflow-scroll h-[26vh] mt-4">
                <div v-for="(comment, index) in quote.comments" :key="index">
                  <div class="flex items-center">
                    <img
                      class="w-[3.25rem] h-[3.25rem] rounded-[50%] object-cover"
                      :src="quote.usersImages[index]"
                      alt="user-image"
                    />
                    <h2 class="text-xl ml-4">{{ quote.usernames[index] }}</h2>
                  </div>
                  <div>
                    <p class="ml-[4.3rem] break-words">{{ comment }}</p>
                    <div
                      class="border-t border-[#efefef] opacity-20 my-2 w-full"
                    ></div>
                  </div>
                </div>
                <h2 class="text-2xl" v-if="!quote.showComments">
                  No comments yet
                </h2>
              </div>
              <form
                @submit.prevent="quoteComment(quote.id, index, comment)"
                class="flex items-center pb-4"
              >
                <img
                  class="w-[3.25rem] h-[3.25rem] rounded-[50%] object-cover"
                  :src="userImage"
                  alt="user-image"
                />
                <input
                  :id="index + 'input'"
                  @input="comment = $event.target.value"
                  class="bg-[#24222F] px-4 h-12 ml-3 w-11/12 rounded-lg outline-none placeholder:text-white placeholder:text-lg"
                  type="text"
                  placeholder="Write a comment"
                />
              </form>
            </div>
          </div>
        </div>
        <div class="overflow-scroll h-[81vh] mt-4" v-if="!show">
          <div
            v-for="(movie, index) in movies"
            :key="index"
            class="mt-6 bg-[#0D0B14] text-white"
          >
            <div
              class="w-[55rem] h-[45rem] px-8 pt-4 bg-[#11101A] flex flex-col rounded-xl text-white"
            >
              <div class="flex items-center">
                <img
                  :src="moviesCreatorsImages[index]"
                  class="w-[3.75rem] h-[3.75rem] rounded-[50%] object-cover"
                  alt="profile"
                />
                <p class="text-xl ml-4">{{ movieCreatorsUsernames[index] }}</p>
              </div>
              <p class="bg-[#11101A] ml-2 my-4 text-xl">
                {{ movie.title.en }}
              </p>
              <p class="bg-[#11101A] ml-2 text-xl">
                Director: {{ movie.director.en }}
              </p>
              <img
                @click="seeMovie(movie.id)"
                class="rounded-xl mt-6 w-full h-[28rem] object-cover"
                :src="BACK_URL_IMAGE + '/storage/' + movie.image"
                alt=""
              />
              <div class="flex items-center mt-4">
                <p class="text-2xl mx-4">{{ movie.quote_number }}</p>
                <img class="w-10 h-10" src="@/assets/quote.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "@/components/layout/PageHeader.vue";
import RedButton from "@/components/ui/RedButton.vue";
import UserInfo from "@/components/layout/UserInfo.vue";
import router from "@/router/index.js";
import axiosInstance from "@/config/axios.js";
import { ref, onBeforeMount } from "vue";

const BACK_URL = import.meta.env.VITE_BACK_URL;
const BACK_URL_IMAGE = BACK_URL.replace("/api", "");
const userImage = ref(null);
const username = ref(null);
const quotes = ref([]);
const movies = ref([]);
const moviesCreatorsImages = ref([]);
const movieCreatorsUsernames = ref([]);
const inputSearch = ref("");
const show = ref(true);
const quoteKa = ref("");
const quoteEn = ref("");
const showMovies = ref(false);
const usersMovies = ref([]);
const movieId = ref(null);
const image = ref(null);
const showQuoteForm = ref(false);
const page = ref(0);
const maxPage = ref(null);

function moviesRoute() {
  router.push({ path: "/movies" });
}

function newsRoute() {
  router.push({ path: "/news-feed" });
}

function seeMovie(movieId) {
  router.push({ path: "/movies/" + movieId });
}

function handleChange(e) {
  const file = e.target.files[0];
  image.value = file;
}

function addQuote() {
  const formData = new FormData();
  formData.append("quote_en", quoteEn.value);
  formData.append("quote_ka", quoteKa.value);
  formData.append("movie_id", movieId.value);
  formData.append("image", image.value);

  axiosInstance
    .post(BACK_URL + "/add-quote", formData)
    .then(() => {
      showQuoteForm.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
}
function inputStyle() {
  const searchInput = document.getElementById("searchInput");
  const searchDiv = document.getElementById("searchDiv");
  const quote = document.getElementById("addQuote");
  if (searchInput.placeholder === "Search by") {
    searchInput.placeholder =
      "Enter @ to search movies, Enter # to search quotes";
  } else {
    searchInput.placeholder = "Search by";
  }

  searchDiv.classList.toggle("!w-[49rem]");
  searchInput.classList.toggle("!w-[49rem]");
  quote.classList.toggle("!w-[13.3rem]");
}

function likeDislike(id, index) {
  axiosInstance
    .post(BACK_URL + "/like-dislike", {
      quote_id: id,
    })
    .then((response) => {
      if (response.status === 201) {
        quotes.value[index].likes++;
        quotes.value[index].liked = true;
      } else {
        quotes.value[index].likes--;
        quotes.value[index].liked = false;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function search() {
  if (inputSearch.value === "") {
    quotes.value = [];
    page.value = 0;
    getQuotes();
    observee();
  } else {
    axiosInstance
      .post(BACK_URL + "/search", {
        search: inputSearch.value,
      })
      .then((response) => {
        quotes.value = [];

        if (inputSearch.value.startsWith("@")) {
          show.value = false;
          movies.value = response.data[0];
          response.data[1].forEach((image, index) => {
            if (image === "/images/default.jpg") {
              moviesCreatorsImages.value[index] = BACK_URL_IMAGE + image;
            } else {
              moviesCreatorsImages.value[index] =
                BACK_URL_IMAGE + "/storage/" + image;
            }
          });
          movieCreatorsUsernames.value = response.data[2];
          quotes.value = [];
        }
        if (inputSearch.value.startsWith("#")) {
          movies.value = [];
          show.value = true;
          response.data[0].forEach((quote, index) => {
            if (response.data[2][index] === "/images/default.jpg") {
              quote["creatorImage"] = BACK_URL_IMAGE + response.data[2][index];
            } else {
              quote["creatorImage"] =
                BACK_URL_IMAGE + "/storage/" + response.data[2][index];
            }
            quote["creatorUsername"] = response.data[1][index];
            quote["movieTitle"] = response.data[3][index];
            quote["likes"] = response.data[4][index];
            quote["liked"] = response.data[5][index];
            quote["comments"] = response.data[6][index];
            quote["usernames"] = response.data[7][index];
            let usersImages = [];
            response.data[8][index].forEach((image, index) => {
              if (image === "/images/default.jpg") {
                usersImages[index] = BACK_URL_IMAGE + image;
              } else {
                usersImages[index] = BACK_URL_IMAGE + "/storage/" + image;
              }
            });
            quote["usersImages"] = usersImages;
            quote["showComments"] = response.data[9][index];
            console.log(quotes);
            quotes.value.push(quote);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function quoteComment(quoteId, quoteIndex, comment) {
  const data = {
    comment: comment,
    quote_id: quoteId,
  };
  if (comment !== "") {
    document.getElementById(quoteIndex + "input").value = "";
    axiosInstance.post(BACK_URL + "/add-comment", data).then((response) => {
      quotes.value[quoteIndex].showComments = true;
      quotes.value[quoteIndex].comment_number =
        quotes.value[quoteIndex].comment_number + 1;
      quotes.value[quoteIndex].comments.push(response.data[0].comment);
      quotes.value[quoteIndex].usernames.push(response.data[1]);
      if (response.data[2] === "/images/default.jpg") {
        quotes.value[quoteIndex].usersImages.push(
          BACK_URL_IMAGE + response.data[2]
        );
      } else {
        quotes.value[quoteIndex].usersImages.push(
          BACK_URL_IMAGE + "/storage/" + response.data[2]
        );
      }
    });
  }
}

function getQuotes(pageId) {
  show.value = true;
  movies.value = [];

  axiosInstance
    .post(BACK_URL + "/news-feed-quotes?page=" + pageId)
    .then((response) => {
      response.data[0].data.forEach((quote, index) => {
        if (response.data[2][index] === "/images/default.jpg") {
          quote["creatorImage"] = BACK_URL_IMAGE + response.data[2][index];
        } else {
          quote["creatorImage"] =
            BACK_URL_IMAGE + "/storage/" + response.data[2][index];
        }
        quote["creatorUsername"] = response.data[1][index];
        quote["movieTitle"] = response.data[3][index];
        quote["likes"] = response.data[4][index];
        quote["liked"] = response.data[5][index];
        quote["comments"] = response.data[6][index];
        quote["usernames"] = response.data[7][index];
        let usersImages = [];
        response.data[8][index].forEach((image, index) => {
          if (image === "/images/default.jpg") {
            usersImages[index] = BACK_URL_IMAGE + image;
          } else {
            usersImages[index] = BACK_URL_IMAGE + "/storage/" + image;
          }
        });
        quote["usersImages"] = usersImages;
        quote["showComments"] = response.data[9][index];
        quotes.value.push(quote);
      });
      const indexOflastPage = ref(
        response.request.response.search('"last_page":') + 12
      );
      maxPage.value = response.request.response.charAt(indexOflastPage.value);
    });
}

const observer = new IntersectionObserver(
  async function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting) {
      getQuotes(page.value + 2);
      console.log("loaded");
      page.value++;
      observer.unobserve(ent.target);
    }

    if (page.value <= maxPage.value && ent.isIntersecting) {
      // const element = ref(document.getElementById("quotes").lastElementChild);
      // console.log(document.getElementById("quotes"), element.value);
      // observer.observe(element.value);
      // console.log("new observer", maxPage.value);
      console.log(
        document.getElementById("quotes").lastElementChild,
        document.getElementById("quotes")
      );

      observee();
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "0px",
  }
);

function observee() {
  observer.observe(document.getElementById("quotes").lastElementChild);
}

onBeforeMount(() => {
  getQuotes();
  axiosInstance.post(BACK_URL + "/get-user-info").then((response) => {
    if (response.data[0] === "/images/default.jpg") {
      userImage.value = BACK_URL_IMAGE + response.data[0];
    } else {
      userImage.value = BACK_URL_IMAGE + "/storage/" + response.data[0];
    }
    username.value = response.data[1];
  });

  axiosInstance.post(BACK_URL + "/get-movies").then((response) => {
    usersMovies.value = response.data;
  });
});
</script>
