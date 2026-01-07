<?php
namespace Waxedphp\Form;

class Setter extends \Waxedphp\Waxedphp\Php\Setters\AbstractSetter {

  /**
   * @var array<mixed> $setup
   */
  private array $setup = [
  ];
  
  /**
   * allowed options
   *
   * @var array<mixed> $_allowedOptions
   */
  protected array $_allowedOptions = [
  ];
  
  /**
   * @var array<mixed> $commands
   */
  private array $commands = [
  ];

  function setValue($value) {
    $this->setup['value'] = $value;
    return $this;
  }

  function setMode($mode) {
    $this->setup['mode'] = $mode;
    return $this;
  }

  function setTheme($theme) {
    $this->setup['theme'] = $theme;
    return $this;
  }
  
  /**
	* Focus to input with name
  */
  function setFocus(string $name) {
    $this->commands[] = ['cmd' => 'focus', 'name' => $name];
    return $this;
  }

  /**
  * value
  *
  * @param mixed $value
  * @return array<mixed>
  */
  public function value(mixed $value = ''): array {
    $a = [];
    $b = $this->getArrayOfAllowedOptions();
    if (!empty($b)) {
      $a['config'] = $b;
    }
    $a['value'] = $value;
    if (!empty($this->commands)) {
      $a['commands'] = $this->commands;
      $this->commands = [];
    };
    return $a;
  }

}
