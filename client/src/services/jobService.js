import { jobs } from '../stores/jobStore.js';
import { fetchDelete, fetchGet } from '../util/fetchUtil.js';

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

        return current.map(job =>
            job.id === updatedJob.id
                ? {...job, ...updatedJob}
                : job
        ); 
    });
}

export async function deleteJob(jobId) {
    const result = await fetchDelete(`/jobs/${jobId}`);

    if (!result?.error) {
        jobs.update(current => current.filter(job => job.id !== jobId));
    }

    return result;
}