# max_size

This was an experiment to answer the question asked in https://forum.dfinity.org/t/maximal-data-size-for-update-call/18308.

I used a simple program that just returns the size of the argument. I then called it with a blob of data of increasing size. The loop errored out with a message that the argument was too large.

```
​​​Server returned an error:​​​
​​​  Code: 413 (Payload Too Large)​​​
​​​  Body: Request 0xfbd827e7dc93c1f2944ceebbce2b21da669f0f7f74b4a2a4da5ab202c7e3e7f5 is too large. Message byte size etc is larger than the max allowed 3670016.​​​
​​​  Retrying request.​​​
```

There is other information than just the blob in the message, so the maximum size of the body is smaller than the maximum size of the blob by 182 bytes. Thus, the maximum payload you can deliver is 3669834 bytes, or ~3.5 MB.
