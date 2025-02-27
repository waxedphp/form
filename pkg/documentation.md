# Form

Form utility - within WaxedPHP environment.

MIT license

---
### PHP:

```

$this->waxed->display([
  'payload' =>
    [
      'value' => 'program Test;
      uses MyLib;
      begin
        writeln(\'Hello world.\')
      end.
      ',
      'mode' => 'ace/mode/pascal',
      'theme' => 'ace/theme/tomorrow',
    ],
], 'template');

```
---

### HTML:

```

<textarea class="waxed-ace"
  name="code1"
  style="height:200px;"
  data-name="payload" >

</textarea>

```
---

