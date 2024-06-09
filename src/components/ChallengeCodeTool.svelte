<script lang="ts">
  const header =
    "<center>img70%(banner)\n\nChallenge Start Date: %START% // Challenge Finish Date: YYYY-MM-DD\n\nLegend: [✅] = Completed / [▶️] = Current / [❌️] = Not Completed</center>\n\n<hr>";

  let input = "";
  let output = "";

  const onInput = () => {
    let text = input;

    text = text.replace(/^[^<]*<hr>/, header);
    text = text.replaceAll("[O]", "[❌️]");
    text = text.replaceAll(/\[.*_Title]\(.*\)/g, "");
    text = text.replaceAll(
      /\[.*]\(https:\/\/anilist.co\/(anime|manga)\/([^()/]*\/?)\)/g,
      "https://anilist.co/$1/$2",
    );

    text = text.replace("%START%", new Date().toISOString()
      .split("T")[0]);

    output = text;
  };
</script>

<div class="text-center">
  <textarea
    bind:value={input}
    class="h-[99vh] w-[45%] resize-none bg-ctp-crust"
    on:input={onInput}
    rows="50"
  />
  <textarea
    bind:value={output}
    class="h-[99vh] w-[45%] resize-none bg-ctp-crust"
    rows="50"
  />
</div>
