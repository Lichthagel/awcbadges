{
  description = "A very basic flake";

  outputs = {
    self,
    nixpkgs,
    flake-parts,
    flake-utils,
  } @ inputs:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = flake-utils.lib.defaultSystems;

      perSystem = {config, lib, pkgs, system,...}: {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs
            nodePackages.pnpm
          ];
        };
      };
    };

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    flake-parts.url = "github:hercules-ci/flake-parts";

    flake-utils.url = "github:numtide/flake-utils";
  };
}
