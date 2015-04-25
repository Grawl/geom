module.exports = function (grunt) {
	require("time-grunt")(grunt);
	require("jit-grunt")(grunt, {
		bower: "main-bower-files"
	});
	grunt.initConfig({
		_src: "source",
		_dist: "build",
		_src_ts: "<%= _src %>/scripts",
		_src_ts_files: "<%= _src %>/scripts/**/*.ts",
		_src_sass: "<%= _src %>/styles",
		_src_jade: "<%= _src %>/templates",
		_dist_ts: "<%= _dist %>/scripts",
		typescript: {
			build: {
				src: "<%= _src_ts_files %>",
				dest: "<%= _dist_ts %>",
				options: {
					basePath: "<%= _src_ts %>/",
					sourceMap: true
				}
			}
		},
		jade: {
			build: {
				options: {
					pretty: true,
					client: false
				},
				expand: true,
				cwd: "<%= _src_jade %>",
				dest: "<%= _dist %>/",
				src: [
					"*.jade",
					"!_*.jade"
				],
				ext: ".html"
			}
		},
		sass: {
			build: {
				options: {
					sourcemap: true
				},
				expand: true,
				cwd: "<%= _src_sass %>",
				dest: "<%= _dist %>",
				src: [
					"*.sass",
					"!_*.sass"
				],
				ext: ".css"
			}
		},
		postcss: {
			build: {
				options: {
					processors: [
						require("autoprefixer-core").postcss
					],
					map: true
				},
				src: "<%= _dist %>/*.css"
			}
		},
		clean: {
			build: "build"
		},
		copy: {
			build: {
				expand: true,
				cwd: "<%= _src %>/",
				dest: "<%= _dist %>/",
				src: [
					"**/*",
					"!scripts/**/*",
					"!styles/**/*",
					"!templates/**/*"
				]
			}
		},
		bower: {
			build: {
				dest: "<%= _dist %>/vendor"
			}
		},
		connect: {
			build: {
				options: {
					livereload: true,
					port: 9010,
					base: "<%= _dist %>"
				}
			}
		},
		watch: {
			typescript: {
				files: "<%= _src_ts_files %>",
				tasks: "newer:typescript"
			},
			sass: {
				files: "<%= _src_sass %>/*.sass",
				tasks: "newer:sass"
			},
			jade: {
				files: "<%= _src_jade %>/*.jade",
				tasks: "newer:jade"
			},
			base: {
				files: [
					"<%= _src %>/**/*",
					"!<%= _src %>/{scripts,styles,templates}/**/*"
				],
				tasks: "newer:copy"
			},
			system: {
				files: [
					"*.js",
					"*.json"
				],
				tasks: "build"
			},
			livereload: {
				options: {
					livereload: true
				},
				files: "<%= _dist %>/**/*"
			}
		}
	});
	grunt.registerTask("build",
		[
			"bower",
			"copy",
			"typescript",
			"jade",
			"sass",
			"postcss"
		]
	);
	grunt.registerTask("default", [
		"clean",
		"build",
		"connect",
		"watch"
	]);
};
