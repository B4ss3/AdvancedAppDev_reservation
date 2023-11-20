<script>
	export let data;
</script>

<form
	method="POST"
	action="?/login"
>
	<label>
		Username
		<input
			name="username"
			type="text"
			value="admin"
		/>
	</label>
	<label>
		Password
		<input
			name="password"
			type="password"
			value="admin"
		/>
	</label>
	<button type="submit">Login</button>
	<button
		type="submit"
		formaction="?/register">Register</button
	>
</form>
