{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = {nixpkgs, ...}:
      let 
        system = "x86_64-linux";
        pkgs = import nixpkgs { inherit system; };
      in
    with pkgs; {
      devShells.${system}.default = mkShell {

          packages = [
            nodejs_24
            eslint
            typescript-language-server
          ];
          
          nativeBuildInputs = [ ];
          
          buildInputs = [ ];
        };

      formatter.x86_64-linux = legacyPackages.${system}.nixpkgs-fmt;
    };
}

