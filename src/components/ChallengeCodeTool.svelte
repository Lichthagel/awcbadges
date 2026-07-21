<script lang="ts">
  const header =
    "<center>img70%(banner)\n\nChallenge Start Date: %START% // Challenge Finish Date: YYYY-MM-DD\n\nLegend: [✅] = Completed / [▶️] = Current / [❌️] = Not Completed</center>\n\n<hr>";

  let input = $state<string>("");
  let output = $state<string>("");

  const onInput = () => {
    let text = input;

    text = text.replace(/^[^<]*<hr>/, () => header);
    text = text.replaceAll("[O]", "[❌️]");
    text = text.replaceAll(/\[.*_Title]\(.*\)/g, "");
    text = text.replaceAll(
      /\[.*]\(https:\/\/anilist.co\/(anime|manga)\/([^()/]*\/?)\)/g,
      "https://anilist.co/$1/$2",
    );

    text = text.replace(
      "%START%",
      () => new Date().toISOString().split("T", 2)[0],
    );

    output = text;
  };
</script>

<div class="text-center">
  <textarea
    bind:value={input}
    class="bg-ctp-crust h-[99vh] w-[45%] resize-none"
    oninput={onInput}
    rows="50"></textarea>
  <textarea
    bind:value={output}
    class="bg-ctp-crust h-[99vh] w-[45%] resize-none"
    rows="50"></textarea>
</div>
