## 2025-05-15 - Parallelize Independent Async Calls
**Learning:** Sequential `await` calls create unnecessary delays in data fetching, especially with multiple independent blockchain read operations.
**Action:** Use `Promise.all` to execute independent async operations concurrently, reducing total wait time to the duration of the slowest request.
