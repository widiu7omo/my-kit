<script lang="ts">
    import {enhance} from '$app/forms';
    import {Avatar, LightSwitch, menu, SlideToggle} from '@skeletonlabs/skeleton';
    import {storeLightSwitch} from '@skeletonlabs/skeleton';
    import {language} from "../../i18n/generated";

    let valueChecked: boolean = true;
    $:{
        let lang = valueChecked ? 'en' : 'id'
        language.set(lang)
    }
</script>

<div class="relative">
    <button class="btn btn-sm p-0" use:menu={{ menu: 'profile-menu', interactive: true }}>
        <div class="relative inline-block">
			<span class="badge p-1 variant-filled-primary absolute -top-2 -right-4 z-10 text-xs">50k</span
            >
            <Avatar
                    src="https://i.pravatar.cc/"
                    width="w-10"
                    rounded="rounded-full"
                    border="border-none"
            />
        </div>
    </button>
    <div class="card p-2 w-52 shadow-xl" data-menu="profile-menu">
        <ul class="list-nav !space-y-1">
            <li><a class="!px-4 !py-2 text-sm" href="/">Home</a></li>
            <li><a class="!px-4 !py-2 text-sm" href="/">Blog</a></li>
            <li><a class="!px-4 !py-2 text-sm" href="/">About</a></li>
            <li>
                <div class="!px-4 !py-2 flex justify-between">
                    <p class="!text-sm">Lang : {valueChecked ? "en" : "id"}</p>
                    <SlideToggle size="sm" bind:checked={valueChecked} label={valueChecked?"en":"id"}/>
                </div>
            </li>
            <li>
                <div class="!px-4 !py-2 flex justify-between">
                    <p class="!text-sm">Theme : {$storeLightSwitch ? 'Dark' : 'Light'}</p>
                    <LightSwitch/>
                </div>
            </li>
        </ul>
        <form use:enhance method="post" action="/login?/logout">
            <button type="submit" class="w-full btn btn-sm variant-filled-primary mt-5">
                <span class="!text-center text-sm">Logout</span>
            </button>
        </form>
    </div>
</div>
