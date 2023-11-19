<script>
	export let data;
</script>

<form method="POST">
	<label>
		Username
		<input
			name="username"
			type="text"
			value="user"
		/>
	</label>
	<label>
		Password
		<input
			name="password"
			type="password"
			value="password"
		/>
	</label>
	<button type="submit">Login</button>
</form>
