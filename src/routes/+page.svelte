<script>
    export let data;
    console.log(data);
</script>

<h1>insert here :
    front (view all apartments, no sorting)
</h1>
<ul>
    {#each data.apartments as apartment}
    <li><a href={"/apartments/" + apartment.id}>{apartment.name}</a></li>
    {/each}
</ul>
