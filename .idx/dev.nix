{ pkgs, ... }: {
idx.previews = {
  enable = true;
  previews = [

    {
      command = [
        "npm"
        "run"
        "start"
        "--"
        "--port"
        "$PORT"
        "--host"
        "0.0.0.0"
        "--disable-host-check"
      ];
      id = "web";
      manager = "web";
    }
    {
      id = "android";
      manager = "android";
    }
    {
      id = "ios";
      manager = "ios";
    }
  ];
};
}
