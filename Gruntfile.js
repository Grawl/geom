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
		clean: {
			build: "build"
		},
		copy: {
			build: {
				expand: true,
				cwd: "<%=_src%>/",
				dest: "<%=_dist%>/",
				src: [
					"*.html",
					"*.css",
					"fonts/*"
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
			base: {
				files: [
					"<%=_src%>/*.html",
					"<%=_src%>/*.css",
					"<%=_src%>/fonts/*"
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
			"typescript"
		]
	);
	grunt.registerTask("default", [
		"clean",
		"build",
		"connect",
		"watch"
	]);
};
