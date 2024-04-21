<script lang="ts">
  const header =
    "<center>img70%(banner)\n\nChallenge Start Date: %START% // Challenge Finish Date: YYYY-MM-DD\n\nLegend: [✅] = Completed / [▶️] = Current / [❌️] = Not Completed</center>\n\n<hr>";

  let input = "";
  let output = "";

  const onInput = () => {
    console.log("input");

    let text = input;

    text = text.replace(/^[^<]*<hr>/, header);
    text = text.replaceAll("[O]", "[❌️]");
    text = text.replaceAll(/\[.*_Title]\(.*\)/g, "");
    text = text.replaceAll(
      /\[.*]\(https:\/\/anilist.co\/(anime|manga)\/([^()/]*\/?)\)/g,
      "https://anilist.co/$1/$2",
    );

    text = text.replace("%START%", new Date().toISOString().split("T")[0]);

    output = text;
  };
</script>

<div class="text-center">
  <textarea
    bind:value={input}
    on:input={onInput}
    rows="50"
    class="h-[99vh] w-[45%] resize-none bg-ctp-crust"
  />
  <textarea
    bind:value={output}
    rows="50"
    class="h-[99vh] w-[45%] resize-none bg-ctp-crust"
  />
</div>
