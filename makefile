all:

dev:
	npx vite dev --host

build:
	npx vite build

build-prev:
	npx vite build && npx vite preview --host
