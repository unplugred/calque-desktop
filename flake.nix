{
	inputs = {
		nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
		flake-utils.url = "github:numtide/flake-utils";
	};

	outputs = { self, nixpkgs, flake-utils, ... }:
	flake-utils.lib.eachDefaultSystem (system:
	let
		pkgs = nixpkgs.legacyPackages.${system};
	in with pkgs; {
		devShells.default = pkgs.mkShell {
			buildInputs = [ # packages
				git
				nodejs
				electron
			];

			# environment variables
			PROJECT_NAME = "calque";
		};
		packages.default = buildNpmPackage rec {
			name = "calque";
			version = "1.5.1";
			src = ./app;
			npmDepsHash = "sha256-PB/DPRusZSDfeUO4dtXu1rEwYnYVq8/pTEh/eCQxE0s=";

			packageJSON = ./app/package.json;
			nativeBuildInputs = [
				electron
			];

			dontNpmBuild = true;

			env = {
				ELECTRON_SKIP_BINARY_DOWNLOAD = 1;
			};

			postInstall = ''
				makeWrapper ${electron}/bin/electron $out/bin/${name} \
					--add-flags $out/lib/node_modules/${name}/run.js
			'';
		};
	});
}
