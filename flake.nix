{
	inputs = {
		nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
		flake-utils.url = "github:numtide/flake-utils";
	};

	outputs = { self, nixpkgs, flake-utils, ... }:
	flake-utils.lib.eachDefaultSystem (system:
	let
		pkgs = nixpkgs.legacyPackages.${system};
	in {
		devShells.default = pkgs.mkShell {
			buildInputs = with pkgs; [ # packages
				git
				nodejs
				electron
			];

			# environment variables
			ELECTRON_SKIP_BINARY_DOWNLOAD = "1";
			PROJECT_NAME = "calque";
		};
	});
}
