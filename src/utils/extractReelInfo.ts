export interface Media {
    taken_at: number;
    pk: string;
    id: string;
    fbid: string;
    device_timestamp: number;
    caption_is_edited: boolean;
    strong_id__: string;
    deleted_reason: number;
    has_shared_to_fb: number;
    has_delayed_metadata: boolean;
    mezql_token: string;
    share_count_disabled: boolean;
    should_request_ads: boolean;
    is_reshare_of_text_post_app_media_in_ig: boolean;
    is_visual_reply_commenter_notice_enabled: boolean;
    like_and_view_counts_disabled: boolean;
    is_post_live_clips_media: boolean;
    comment_threading_enabled: boolean;
    is_unified_video: boolean;
    commerciality_status: string;
    client_cache_key: string;
    integrity_review_decision: string;
    has_privately_liked: boolean;
    filter_type: number;
    can_see_insights_as_brand: boolean;
    media_type: number;
    code: string;
    caption: {
        bit_flags: number;
        created_at: number;
        created_at_utc: number;
        did_report_as_spam: boolean;
        is_ranked_comment: boolean;
        pk: string;
        share_enabled: boolean;
        content_type: string;
        media_id: string;
        status: string;
        type: number;
        user_id: string;
        strong_id__: string;
        text: string;
        user: {
            pk: string;
            pk_id: string;
            id: string;
            username: string;
            full_name: string;
            is_private: boolean;
            is_unpublished: boolean;
            strong_id__: string;
            fbid_v2: string;
            is_verified: boolean;
            profile_pic_id: string;
            profile_pic_url: string;
            profile_pic_url_original: string;
        };
        is_covered: boolean;
        private_reply_status: number;
    };
    sharing_friction_info: {
        bloks_app_url: null;
        should_have_sharing_friction: boolean;
        sharing_friction_payload: null;
    };
    timeline_pinned_user_ids: string[];
    play_count: number;
    has_views_fetching: boolean;
    fb_play_count: number;
    ig_play_count: number;
    creator_viewer_insights: string[];
    fb_user_tags: { in: string[]; };
    coauthor_producers: string[];
    coauthor_producer_can_see_organic_insights: boolean;
    invited_coauthor_producers: string[];
    is_in_profile_grid: boolean;
    profile_grid_control_enabled: boolean;
    media_cropping_info: {
        square_crop: {
            crop_left: number;
            crop_right: number;
            crop_top: number;
            crop_bottom: number;
        };
    };
    user: {
        fbid_v2: string;
        feed_post_reshare_disabled: boolean;
        full_name: string;
        id: string;
        is_private: boolean;
        is_unpublished: boolean;
        pk: string;
        pk_id: string;
        show_account_transparency_details: boolean;
        strong_id__: string;
        third_party_downloads_enabled: number;
        username: string;
        account_type: number;
        account_badges: string[];
        fan_club_info: {
            autosave_to_exclusive_highlight: null;
            connected_member_count: null;
            fan_club_id: null;
            fan_club_name: null;
            has_created_ssc: null;
            has_enough_subscribers_for_ssc: null;
            is_fan_club_gifting_eligible: null;
            is_fan_club_referral_eligible: null;
            is_free_trial_eligible: null;
            largest_public_bc_id: null;
            subscriber_count: null;
            fan_consideration_page_revamp_eligiblity: null;
        };
        friendship_status: {
            following: boolean;
            is_bestie: boolean;
            is_feed_favorite: boolean;
            is_restricted: boolean;
        };
        has_anonymous_profile_picture: boolean;
        hd_profile_pic_url_info: {
            height: number;
            url: string;
            width: number;
            url_original: string;
        };
        hd_profile_pic_versions: {
            height: number;
            url: string;
            width: number;
            url_original: string;
        }[];
        is_favorite: boolean;
        is_verified: boolean;
        profile_pic_id: string;
        profile_pic_url: string;
        transparency_product_enabled: boolean;
        is_embeds_disabled: boolean;
        profile_pic_url_original: string;
    };
    owner: {
        fbid_v2: string;
        feed_post_reshare_disabled: boolean;
        full_name: string;
        id: string;
        is_private: boolean;
        is_unpublished: boolean;
        pk: string;
        pk_id: string;
        show_account_transparency_details: boolean;
        strong_id__: string;
        third_party_downloads_enabled: number;
        username: string;
        account_type: number;
        account_badges: string[];
        fan_club_info: {
            autosave_to_exclusive_highlight: null;
            connected_member_count: null;
            fan_club_id: null;
            fan_club_name: null;
            has_created_ssc: null;
            has_enough_subscribers_for_ssc: null;
            is_fan_club_gifting_eligible: null;
            is_fan_club_referral_eligible: null;
            is_free_trial_eligible: null;
            largest_public_bc_id: null;
            subscriber_count: null;
            fan_consideration_page_revamp_eligiblity: null;
        };
        friendship_status: {
            following: boolean;
            is_bestie: boolean;
            is_feed_favorite: boolean;
            is_restricted: boolean;
        };
        has_anonymous_profile_picture: boolean;
        hd_profile_pic_url_info: {
            height: number;
            url: string;
            width: number;
            url_original: string;
        };
        hd_profile_pic_versions: {
            height: number;
            url: string;
            width: number;
            url_original: string;
        }[];
        is_favorite: boolean;
        is_verified: boolean;
        profile_pic_id: string;
        profile_pic_url: string;
        transparency_product_enabled: boolean;
        is_embeds_disabled: boolean;
        profile_pic_url_original: string;
    };
    image_versions2: {
        candidates: {
            width: number;
            height: number;
            url: string;
            scans_profile: string;
            url_original: string;
        }[];
        additional_candidates: {
            igtv_first_frame: {
                width: number;
                height: number;
                url: string;
                scans_profile: string;
                url_original: string;
            };
            first_frame: {
                width: number;
                height: number;
                url: string;
                scans_profile: string;
                url_original: string;
            };
            smart_frame: null;
        };
        scrubber_spritesheet_info_candidates: {
            default: {
                video_length: number;
                thumbnail_width: number;
                thumbnail_height: number;
                thumbnail_duration: number;
                sprite_urls: string[];
                thumbnails_per_row: number;
                total_thumbnail_num_per_sprite: number;
                max_thumbnails_per_sprite: number;
                sprite_width: number;
                sprite_height: number;
                rendered_width: number;
                file_size_kb: number;
            };
        };
    };
    original_width: number;
    original_height: number;
    is_artist_pick: boolean;
    media_notes: {
        items: string[];
    };
    enable_media_notes_production: boolean;
    product_type: string;
    is_paid_partnership: boolean;
    music_metadata: null;
    organic_tracking_token: string;
    is_third_party_downloads_eligible: boolean;
    ig_media_sharing_disabled: boolean;
    are_remixes_crosspostable: boolean;
    crosspost_metadata: {
        fb_downstream_use_xpost_metadata: {
            downstream_use_xpost_deny_reason: string;
        };
    };
    boost_unavailable_identifier: null;
    boost_unavailable_reason: null;
    boost_unavailable_reason_v2: null;
    subscribe_cta_visible: boolean;
    creative_config: {
        capture_type: string;
        creation_tool_info: string[];
        effect_configs: null;
    };
    is_cutout_sticker_allowed: boolean;
    gen_ai_detection_method: {
        detection_method: string;
    };
    fb_aggregated_like_count: number;
    fb_aggregated_comment_count: number;
    has_high_risk_gen_ai_inform_treatment: boolean;
    open_carousel_show_follow_button: boolean;
    is_tagged_media_shared_to_viewer_profile_grid: boolean;
    should_show_author_pog_for_tagged_media_shared_to_profile_grid: boolean;
    is_eligible_for_media_note_recs_nux: boolean;
    is_social_ufi_disabled: boolean;
    is_eligible_for_meta_ai_share: boolean;
    meta_ai_suggested_prompts: string[];
    fb_like_count: number;
    can_reply: boolean;
    is_eligible_content_for_post_roll_ad: boolean;
    can_view_more_preview_comments: boolean;
    preview_comments: string[];
    hide_view_all_comment_entrypoint: boolean;
    is_comments_gif_composer_enabled: boolean;
    comment_inform_treatment: {
        action_type: null;
        should_have_inform_treatment: boolean;
        text: string;
        url: null;
    };
    has_liked: boolean;
    like_count: number;
    top_likers: string[];
    video_sticker_locales: string[];
    is_dash_eligible: number;
    video_dash_manifest: string;
    number_of_qualities: number;
    video_versions: {
        bandwidth: number;
        height: number;
        id: string;
        type: number;
        url: string;
        width: number;
        url_original: string;
    }[];
    video_duration: number;
    has_audio: boolean;
    clips_tab_pinned_user_ids: string[];
    can_viewer_save: boolean;
    can_viewer_reshare: boolean;
    shop_routing_user_id: null;
    is_organic_product_tagging_eligible: boolean;
    igbio_product: null;
    featured_products: string[];
    product_suggestions: string[];
    has_more_comments: boolean;
    max_num_visible_preview_comments: number;
    explore_hide_comments: boolean;
    is_open_to_public_submission: boolean;
}

interface ReelInfo {
    username: string;
    userId: string;
    postId: string;
    caption: string;
    videoUrl: string;
}

export function extractReelInfo(media: Media): ReelInfo | null {
    // Check if the media is a reel
    if (media.media_type === 2 && media.product_type === 'clips') {
        const { username, id: userId } = media.user;
        const { text: caption } = media.caption;
        const postId = media.id.split('_')[0];

        const videoUrl = media.video_versions[0]?.url_original;

        if (!postId) {
            throw new Error('Post id is not found');
        }

        if (!videoUrl) {
            throw new Error('Video url is not found');
        }

        return {
            username,
            userId,
            postId,
            caption,
            videoUrl
        };
    }
    return null;
}
