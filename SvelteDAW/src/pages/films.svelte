<script>
    // DB
    import { db } from "../firebase";
    import {
        collection,
        getDocs,
        doc,
        addDoc,
        updateDoc,
        deleteDoc,
    } from "firebase/firestore";

    // Producto a añadir / modificar
    let film = {
        name: "",
        description: "",
        year: "",
        category: "",
    };

    // Listado de productos (Ahora la cargamos de BD en firestore)
    let films = [];
    // let film = "";

    // Cargamos datos de bd
    const loadDataFilms = async () => {
        const querySnapshot = await getDocs(collection(db, "films"));
        let docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
        });
        films = [...docs];
        console.log(films);
    };
    loadDataFilms();

    let editar = false;

    const vaciarFormulario = () => {
        film = {
            name: "",
            description: "",
            year: "",
            category: "",
        };
        editar = false;
    };

    const addElementFilm = async () => {
        await addDoc(collection(db, "films"), film);
        await loadDataFilms();
        console.log("film");
        vaciarFormulario();
    };

    const saveElementFilm = async () => {
        await updateDoc(doc(db, "films", film.id), film);
        await loadDataFilms();
        vaciarFormulario();
    };

    const editElementFilm = (p) => {
        film = Object.assign({}, p);
        editar = true;
    };

    const deleteElementFilm = async (id) => {
        await deleteDoc(doc(db, "films", id));
        await loadDataFilms();
    };

    // Handler principal
    const onSubmitHandler = (e) => {
        if (editar) {
            // Guardamos
            console.log("Guardando...");
            saveElementFilm();
        } else {
            addElementFilm();
        }
    };
</script>

<main>
    <!-- Container APP-->
    <div class="container mx-auto">
        <!-- Grid de 2 Columnas con una separación 4 (1rem) -->
        <div class="grid grid-cols-1 gap-4">
            <!-- Caja principal formulario-->
            <div class="p-4 rounded-md text-left">
                <!-- on:evento cuando se envie el formulario-->
                <form on:submit|preventDefault={onSubmitHandler}>
                    <!-- bind:value=variable cada cambio del input se sincorniza con la variable previamente declarada en el código -->
                    <label for="name">Name</label>
                    <input
                        bind:value={film.name}
                        id="name"
                        type="text"
                        placeholder="Film name"
                    />
                    <label for="description">Description</label>
                    <textarea
                        bind:value={film.description}
                        id="description"
                        rows="3"
                        placeholder="Film description"
                    />
                    <label for="name">Year</label>
                    <input
                        bind:value={film.year}
                        id="name"
                        type="text"
                        placeholder="Film year"
                    />
                    <label for="imagen-url">Film Image</label>
                    <input
                        bind:value={film.imagenURL}
                        type="url"
                        id="imagen-url"
                        placeholder="https://amazon.com/..."
                    />
                    <label for="category">Category</label>
                    <select bind:value={film.category} id="category">
                        <option value="Action">Action</option>
                        <option value="Cryptocurrency">Cryptocurrency</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                    </select>
                    <hr class="my-2" />
                    <!-- Este boton debe de ser dual, si se añade o se modifica un elemento cambiara tanto el contenido como la función a la que va a llamar o a ejecutar...-->
                    {#if editar}
                        <button
                            class="ml-5 bg-indigo-200 py-2 px-3 border border-indigo-500 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-indigo-500 hover:text-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:text-gray-700 focus:bg-indigo-200 flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                                />
                            </svg>
                            Edit
                        </button>
                    {:else}
                        <button
                            class="ml-5 bg-green-200 py-2 px-3 border border-green-500 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-green-500 hover:text-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-green-300 focus:text-gray-700 focus:bg-green-200  flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            Add
                        </button>
                    {/if}
                </form>
            </div>
            <!-- Fin Caja principal formulario-->
            <!-- Listado de Elementos-->
            <div class="bg-gray-100 grid grid-cols-2 gap-6">
                {#each films as f, i}
                    <!-- Elemento -->
                    <div
                        class="bg-white rounded-lg sahdow-lg overflow-hidden border m-1 flex flex-col md:flex-row"
                    >
                        <div
                            class="w-full mx-2 h-80 bg-gray-100 rounded-md p-2 my-2"
                        >
                            {#if f.imagenURL}
                                <img
                                    class="object-center object-contain w-full h-full"
                                    src={f.imagenURL}
                                    alt="thumbnail"
                                />
                            {:else}
                                <img
                                    class="object-center object-contain w-full h-full"
                                    src="images/no-product.jpg"
                                    alt="thumbnail"
                                />
                            {/if}
                        </div>
                        <div
                            class="w-full md:w-3/5 text-left p-6 md:p-4 space-y-2"
                        >
                            <p class="text-xl text-gray-700 font-bold">
                                {f.name}
                            </p>
                            <p class="text-base text-gray-400 font-normal">
                                {f.category}
                            </p>
                            <p
                                class="text-base leading-relaxed text-gray-500 font-normal"
                            >
                                {f.description || "Sin descripción"}
                            </p>
                            <div class="flex justify-start space-x-2">
                                <button
                                    class="ml-5 bg-blue-200 py-1 px-2 border border-blue-500 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-blue-500 hover:text-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 focus:text-gray-700 focus:bg-blue-200"
                                    on:click={editElementFilm(f)}
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                </button>
                                <button
                                    class="ml-5 bg-red-200 py-1 px-2 border border-red-500 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-red-500 hover:text-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-red-300 focus:text-gray-700 focus:bg-red-200"
                                    on:click={deleteElementFilm(f.id)}
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- Fin elemento -->
                {/each}
            </div>
            <!-- FIN Listado de Elementos-->
        </div>
        <!-- FIN Grid de 2 Columnas-->
    </div>
    <!-- FIN Container APP-->
</main>

<style>
</style>
