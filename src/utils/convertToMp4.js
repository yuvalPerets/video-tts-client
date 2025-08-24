export async function convertToMp4(file) {
  const { createFFmpeg, fetchFile } = await import('@ffmpeg/ffmpeg');
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();
  ffmpeg.FS('writeFile', file.name, await fetchFile(file));
  await ffmpeg.run('-i', file.name, 'output.mp4');
  const data = ffmpeg.FS('readFile', 'output.mp4');
  return new File([data.buffer], 'output.mp4', { type: 'video/mp4' });
}