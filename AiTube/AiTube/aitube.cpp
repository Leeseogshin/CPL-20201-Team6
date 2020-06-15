#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <fstream>
#include <filesystem>
#include <thread>
#include <string>

using namespace std;

string tempDir;
string ffmpegDir;
string inputDir;
string outputDir;

char temp[10000];
char path[10000];
char arg[10000];

int main(int argc, char* argv[])
{
	int cnt;
	int len;
	strncpy(path, argv[0], strlen(argv[0]) - 10);
	path[strlen(argv[0]) - 10] = 0;
	strncpy(arg, argv[1] + 12, strlen(argv[1]) - 12);
	arg[strlen(argv[1]) - 12] = 0;

	len = strcspn(arg, "?");
	strncpy(temp, arg, len);
	temp[len] = '\0';
	strncpy(arg, arg + len + 1, strlen(arg) - len);

	cnt = atoi(temp);
	string* time = new string[2 * cnt];

	for (int i = 0; i < 2 * cnt; ++i)
	{
		len = strcspn(arg, "!");
		strncpy(temp, arg, len);
		temp[len] = '\0';
		time[i] = string(temp);
		strncpy(arg, arg + len + 1, strlen(arg) - len);
	}

	string user = getenv("USERPROFILE");
	tempDir = user + "\\Documents";
	string fileName = filesystem::directory_iterator(tempDir+"\\AiTube")->path().filename().string();
	ffmpegDir = "\"" + string(path) + "bin\\ffmpeg.exe\"";
	inputDir = "\"" + tempDir + "\\AiTube\\" + fileName + "\"";
	outputDir = "\"" + tempDir + "\"\\BeansSoft_Output.mp4";

	string parameter = "\"" + ffmpegDir + " -y -i " + inputDir + " -filter_complex \"";
	for (int i = 0; i < cnt; ++i)
	{
		parameter += " [0:v] trim=" + time[2 * i] + ":" + time[2 * i + 1] + " , setpts=PTS-STARTPTS[v" + to_string(i) + "];";
		parameter += " [0:a] atrim=" + time[2 * i] + ":" + time[2 * i + 1] + " , asetpts=PTS-STARTPTS[a" + to_string(i) + "]; ";
	}
	for (int i = 0; i < cnt; ++i)
		parameter += "[v" + to_string(i) + "][a" + to_string(i) + "]";
	parameter += "concat=n=" + to_string(cnt) + ":v=1:a=1 [v] [a]\" -map \"[v]\" -map \"[a]\" " + outputDir + "\"";

	system(parameter.c_str());

	return 0;
}