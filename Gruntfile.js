module.exports = function (grunt) {
	require("time-grunt")(grunt);
	require("jit-grunt")(grunt, {
		bower: 'main-bower-files'
	});
	grunt.initConfig({
		_src: "source",
		_dist: "build",
		_src_ts: "<%=_src%>/scripts",
		_src_ts_files: "<%=_src%>/scripts/**/*.ts",
		_dist_ts: "<%=_dist%>/scripts",
		typescript: {
			build: {
				src: "<%=_src_ts_files%>",
				dest: "<%=_dist_ts%>",
				options: {
					basePath: "<%=_src_ts%>/",
					sourceMap: true
				}
			}
		},
		postcss: {
			build: {
				options: {
					processors: [
						require('autoprefixer-core').postcss
					],
					map: true
				},
				src: '<%=_dist%>/*.css'
			}
		},
		clean: {
			build: "build"
		},
		copy: {
			build: {
				expand: true,
				cwd: "<%=_src%>/",
				dest: "<%=_dist%>/",
				src: [
					"**/*",
					"!scripts"
				]
			}
		},
		bower: {
			build: {
				dest: "<%=_dist%>/vendor"
			}
		},
		connect: {
			build: {
				options: {
					port: 9010,
					livereload: 35729,
					hostname: "127.0.0.1",
					//open: "http://127.0.0.1:9010/",
					base: "<%=_dist%>",
					//middleware: function(connect) {
					//	return [
					//		connect().use('/bower_components', connect.static('./bower_components'))
					//	];
					//}
				}
			}
		},
		watch: {
			typescript: {
				files: "<%=_src_ts_files%>",
				tasks: "newer:typescript"
			},
			css: {
				files: "<%=_src%>/*.css",
				tasks: "postcss"
			},
			base: {
				files: [
					"<%=_src%>/**/*",
					"!<%=_src%>/*.css",
					"!<%=_src%>/scripts"
				],
				tasks: "newer:copy"
			},
			options: {
				livereload: true
			}
		}
	});
	grunt.registerTask("build",
		[
			"bower",
			"copy",
			"typescript",
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
