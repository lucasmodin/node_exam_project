import { jobs } from '../stores/jobStore.js';
import { fetchGet } from '../util/fetchUtil.js';

export async function loadJobs() {
    const result = await fetchGet("/jobs");

    if (result.error) {
        return;
    }

    jobs.set(result.data);
}

export async function updateJob(updatedJob) {
    jobs.update(current => {
        const index = current.findIndex(job => job.id === updatedJob.id);

        if (index === -1) {
            return [...current, updatedJob];
        }

        current[index] = updatedJob;
        return [...current];
    });
}