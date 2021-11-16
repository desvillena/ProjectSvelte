<script>
	import { Router, Route, Link } from "svelte-routing";
	// import Index from "./pages/index.svelte";
	import Films from "./pages/films.svelte";
	import Users from "./pages/users.svelte";
	import Tickets from "./pages/tickets.svelte";

	export let url = "";
</script>

<main>
	<Router {url}>
		<h1>APP CINE</h1>
		<nav>
			<!-- <Link to="/">Index</Link> -->
			<Link to="/films">Films</Link>
			<Link to="/users">Users</Link>
			<Link to="/tickets">Tickets</Link>
		</nav>
		<div>
			<!-- <Route path="/"><Films /></Route> -->
			<Route path="/films"><Films /></Route>
			<Route path="/users"><Users /></Route>
			<Route path="/tickets"><Tickets /></Route>
		</div>
	</Router>
</main>
