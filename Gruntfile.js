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
		tsc: {
			build: {
				files: [{
					expand: true,
					dest: "<%=_dist_ts%>",
					cwd: "<%=_src_ts%>",
					ext: ".js",
					src: [
						"**/*.ts",
						"!*.d.ts"
					]
				}],
				options: {
					target: "ES5",
					sourcemap: true
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
				tasks: "tsc"
			},
			base: {
				files: [
					"<%=_src%>/*.html",
					"<%=_src%>/*.css",
					"<%=_src%>/fonts/*"
				],
				tasks: "copy"
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
			"tsc"
		]
	);
	grunt.registerTask("default", [
		"clean",
		"build",
		"connect",
		"watch"
	]);
};
